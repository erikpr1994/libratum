import { colors } from '../../styles/theme.js';

import { useRouter } from 'next/router';

type NavigationType = {
  navigation: String[];
  logged: boolean;
};

export default function Navigation({ navigation, logged }: NavigationType) {
  const router = useRouter();
  return (
    <>
      <ul>
        {logged &&
          navigation.map((item, key) => (
            <li
              key={key}
              onClick={() => {
                router.push(`/${item}`);
              }}
            >
              {item}
            </li>
          ))}
      </ul>
      <style jsx>{`
        ul {
          text-align: center;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 16px;
          height: 100%;
        }

        ul li {
          text-decoration: none;
          list-style-type: none;
          display: flex;
          place-items: center;
          place-content: center;
          height: 100%;
          width: 100px;
          text-transform: uppercase;
        }

        .selected {
          border-bottom: 6px solid ${colors.Charcoal};
        }

        .selected p {
          margin-bottom: -6px;
          font-weight: 400;
        }
      `}</style>
    </>
  );
}
