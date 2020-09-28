import { shadow, colors } from '../../styles/theme.js';

type ButtonType = {
  name: string;
  width: number;
  height: number;
  color: string;
  onClick?: Function;
};

export default function Button({ name, width, height, color }: ButtonType) {
  return (
    <>
      <button>
        <p>{name}</p>
      </button>
      <style jsx>{`
        button {
          width: ${width}px;
          height: ${height}px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: ${shadow};
          border-radius: 15px;
          background: ${color};
          color: ${colors.white};
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
