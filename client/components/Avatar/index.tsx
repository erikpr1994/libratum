import { useContext } from 'react';
import { loginContext } from '@hooks/useLogin';

type AvatarType = {
  alt: string;
  src?: string;
  text?: string;
  height: number;
  width: number;
};

export default function Avatar({ alt, src, text, height, width }: AvatarType) {
  // TODO: Fix context bug -> logged is set as undefined when clicked on login
  const { logged } = useContext(loginContext);

  if (!src) src = 'placeholder/avatar.png';
  return (
    <>
      {logged && (
        <div>
          {text && <strong>{text}</strong>}
          <img alt={alt} src={src} title={alt} />
        </div>
      )}
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          height: 100%;
        }

        strong {
          margin-right: 8px;
        }

        img {
          border-radius: 9999px;
          height: ${height}px;
          width: ${width}px;
        }
      `}</style>
    </>
  );
}
