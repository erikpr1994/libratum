import { colors } from '../../styles/theme.js';

import { useRouter } from 'next/router';

import { useContext } from 'react';

import { loginContext } from '../../hooks/useLogin';

type NavigationType = {
  navigation: String[];
};

var selectedStyle = {
  borderBottom: '3px solid #35c0ed',
  fontWeight: '600',
};

var pSelectedStyle = {
  marginBottom: '-6px',
};

export default function Navigation({ navigation }: NavigationType) {
  const router = useRouter();
  const { logged } = useContext(loginContext);

  const href = router && router.pathname;
  console.log(href);

  return (
    <>
      <ul>
        {logged === true &&
          navigation.map((item, key) => (
            <li
              key={key}
              style={href === `/${item}` ? selectedStyle : {}}
              onClick={() => {
                router.push(`/${item}`);
              }}
            >
              <p style={href === `/${item}` ? pSelectedStyle : {}}>{item}</p>
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
          width: 120px;
          text-transform: uppercase;
          cursor: pointer;
        }

        ul li:hover {
          background: ${colors['Vivid Sky Blue']};
          color: white;
        }
      `}</style>
    </>
  );
}
