import Button from '../Button';
import InputText from '../Form/inputs/TextInput';

import { colors, shadow } from '../../styles/theme.js';

import { loginContext } from '../../hooks/useLogin';
import { useContext } from 'react';

export default function Login() {
  const { setLogged } = useContext(loginContext);

  return (
    <>
      <div>
        <section className="login">
          <form className="login-mail">
            <section>
              <InputText label="email" />
              <InputText label="password" />
              <Button
                name="Login"
                width={160}
                height={46}
                color={colors.Charcoal}
              />
            </section>
          </form>
          <hr className="solid" />
          <form
            className="login-buttons"
            onSubmit={(e) => {
              e.preventDefault();
              setLogged(true);
            }}
          >
            <Button
              name="Github"
              width={160}
              height={46}
              color={colors.Charcoal}
            />

            <Button
              name="Google"
              width={160}
              height={46}
              color={colors.Charcoal}
            />

            <Button
              name="Facebook"
              width={160}
              height={46}
              color={colors.Charcoal}
            />
          </form>
        </section>
        <section className="presentation">
          <h2>Automating your cryptocurrencies has never been easier</h2>
        </section>
      </div>
      <style jsx>{`
        div {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 6fr 4fr;
          grid-template-rows: 1fr;
          flex-direction: row;
          justify-content: space-evenly;
          align-items: center;
        }

        section {
          width: 100%;
          height: 100%;
        }

        article {
          text-align: center;
        }

        form {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
        }

        .login {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .login-mail {
          flex-direction: column;
          flex-grow: 3;
        }

        .login-mail section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 16px;
        }

        .solid {
          border-top: 3px solid ${colors['Vivid Sky Blue']};
          margin: 1em;
        }

        .login-buttons {
          flex-direction: row;
          gap: 16px;
          flex-grow: 2;
        }

        .presentation {
          background: rgb(221, 117, 150);
          background: linear-gradient(
            218deg,
            rgba(221, 117, 150, 1) 0%,
            rgba(53, 192, 237, 1) 100%
          );
          border-radius: 0 15px 15px 0;
          box-shadow: ${shadow};
          color: white;
          display: flex;
          height: 100%;
          justify-content: center;
          align-items: center;
          text-transform: uppercase;
          padding: 2em;
          text-align: center;
          font-size: 2em;
        }
      `}</style>
    </>
  );
}
