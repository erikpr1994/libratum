import { useRouter } from 'next/router';

import Button from '../Button';
import InputText from '../Form/inputs/TextInput';

import { colors, shadow } from '../../styles/theme.js';

export default function Login(click) {
  const router = useRouter();
  const handleClick = () => {
    router.push('/dashboard');
  };
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
                onClick={handleClick}
              />
            </section>
          </form>
          <hr className="solid" />
          <form className="login-buttons">
            <Button
              name="Github"
              width={160}
              height={46}
              color={colors.Charcoal}
              onClick={click}
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
        <section className="presentation"></section>
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
          background: ${colors.Charcoal};
          border-radius: 0 15px 15px 0;
          box-shadow: ${shadow};
        }
      `}</style>
    </>
  );
}
