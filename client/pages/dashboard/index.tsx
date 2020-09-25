import { useState, useEffect } from 'react';

import Loader from 'components/Loader';
import Card from 'components/card';

import Container from 'Layout/Container';

export default function Dashboard() {
  const [balance, setBalance] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const url = `http://192.168.8.124:3002/dashboard?userId=${1}`; // Llamar solo OnLogin

    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        setBalance(response.balances);
        setCurrencies(response.currencies);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="dashboard">
        <Container
          widthPercentage={90}
          heightPercentage={70}
          isLoading={false}
          additionalCss={`grid-row: 1`}
        >
          <p>Test</p>
        </Container>
        <Container
          widthPercentage={90}
          heightPercentage={70}
          isLoading={false}
          additionalCss={`grid-row: 2 `}
        >
          <p>Test 2</p>
        </Container>
        <Container
          widthPercentage={90}
          heightPercentage={90}
          isLoading={isLoading}
          title="holdings"
          additionalCss={`grid-row: 3 / span 3; grid-column: 1`}
        >
          {isLoading ? (
            <div className="loader">
              <Loader />
            </div>
          ) : (
            <div className="cardContainer">
              {balance.map((item, key) => {
                console.log(balance.length);
                return (
                  <Card
                    margin={
                      balance.length - 1 === key
                        ? 'margin:none'
                        : '1px solid black'
                    }
                    key={key}
                    values={item}
                    currency={currencies.map((currency) => {
                      return currency.id === item.currencyId ? currency : false;
                    })}
                  />
                );
              })}
            </div>
          )}
        </Container>
        <Container
          widthPercentage={90}
          heightPercentage={95}
          isLoading={false}
          additionalCss={`grid-row: 1 / -1`}
        >
          <p>Test 3</p>
        </Container>
      </div>
      <style jsx>{`
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

        .classContainer {
          display: grid;
        }

        .classContainer:last-child {
          margin: none;
        }
      `}</style>
    </>
  );
}
