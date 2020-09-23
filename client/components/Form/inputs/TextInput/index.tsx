import { shadow, colors } from "../../../../styles/theme.js";

type TextInput = {
  label: string;
};

export default function TextInput({ label }: TextInput) {
  return (
    <div>
      <label>{label}</label>
      <input></input>
      <style jsx>{`
        div {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        label {
          margin-bottom: 8px;
        }

        input {
          width: 50%;
          max-width: 400px;
          padding: 1em;
          border-radius: 15px;
          border: 1px solid black;
        }
      `}</style>
    </div>
  );
}
