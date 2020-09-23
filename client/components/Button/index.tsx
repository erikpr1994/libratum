import { shadow, colors } from "../../styles/theme.js";

type Button = {
  name: string;
  width: number;
  height: number;
  color: string;
};

export default function Button({ name, width, height, color }: Button) {
  return (
    <>
      <div>
        <p>{name}</p>
      </div>
      <style jsx>{`
        div {
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
