import { useContext } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { rebalanceData } from 'mockData/';

import Loader from 'Components/Loader';

import Container from 'Layout/Container';

import { loginContext } from '@hooks/useLogin';
import { balanceContext } from 'hooks/useBalance';
import { isLoadedContext } from '@hooks/useLoading';
import Button from 'Components/Button';
import { colors } from 'styles/theme';
import { Checkbox } from '@material-ui/core';

const NoSSRComponent = dynamic(
  () => import('Components/chart/noSSRComponent'),
  {
    ssr: false,
  }
);

export default function Balancer() {
  const router = useRouter();
  const logged = useContext(loginContext);

  let isLogged;
  if (typeof logged !== 'object') {
    isLogged = logged;
  } else {
    isLogged = logged.logged;
  }

  if (!isLogged && typeof window !== 'undefined') {
    router.push('/');
  }

  const { loaded, setLoaded } = useContext(isLoadedContext);

  const { balance, setBalance } = useContext(balanceContext);

  function createChartData() {
    return balance.map((value) => {
      return (
        <div key={value.code}>
          <h2>
            {value.code.startsWith('LD')
              ? `${value.code.substring(2)} (Lending)`
              : value.code}
          </h2>
          <form>
            <article>
              <label htmlFor={`delete${value.code}`}>Delete</label>
              <Checkbox
                id={`delete${value.code}`}
                disabled={!value.availableToRebalance}
              />
            </article>
            <article>
              <label htmlFor={`input${value.code}`}>Slider</label>
              <input type={`input${value.code}`}></input>
            </article>
          </form>
          <style jsx>{`
            div {
              display: flex;
              flex-direction: column;
              min-height: 120px;
              justify-content: center;
              align-items: center;
            }

            form {
              display: flex;
              flex-direction: column;
            }

            article {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              gap: 0.5em;
            }

            h2 {
              text-align: center;
              font-size: 1.2em;
            }
          `}</style>
        </div>
      );
    });
  }

  return (
    <>
      <Head>
        <title>Libratum - Balancer</title>
      </Head>
      {isLogged && (
        <div className="dashboard">
          <Container
            widthPercentage={90}
            heightPercentage={90}
            title={loaded ? 'Balancer' : ''}
            additionalCss={`grid-row: 1 / span 4; grid-column: 1 `}
          >
            {loaded === false ? (
              <div className="loader">
                <Loader />
              </div>
            ) : (
              <div className="balancer">{createChartData()}</div>
            )}
          </Container>
          <Container
            widthPercentage={90}
            heightPercentage={90}
            isLoading={false}
            additionalCss={`grid-row: 1 / span 4`}
          >
            {loaded === false ? (
              <div className="loader">
                <Loader />
              </div>
            ) : (
              <NoSSRComponent />
            )}
          </Container>
          <Container
            widthPercentage={20}
            heightPercentage={90}
            isLoading={false}
            additionalCss={`grid-row: 5; grid-column: 1 / span 2`}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setLoaded(false);
                setBalance(rebalanceData);
                setTimeout(() => {
                  setLoaded(true);
                  router.push('/dashboard');
                }, 1000);
              }}
            >
              <Button
                name="Rebalance"
                width={160}
                height={46}
                color={colors.Charcoal}
              />
            </form>
          </Container>
        </div>
      )}
      <style jsx>{`
        form {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .dashboard {
          width: 100vw;
          height: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: repeat(5, minmax(100px, 1fr));
          justify-items: center;
          align-items: center;
        }

        .loader {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }

        .balancer {
          overflow: scroll;
          display: grid;
          height: 100%;
          justify-content: center;
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(auto-fit, minmax(120px, 1fr));
        }
      `}</style>
    </>
  );
}
