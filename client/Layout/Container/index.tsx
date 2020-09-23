import { ReactNode } from "react";

import { shadow } from "../../styles/theme.js";

type Container = {
  widthPercentage: number;
  heightPercentage: number;
  additionalCss: string;
  children: ReactNode;
};

export default function Container({
  children,
  widthPercentage,
  heightPercentage,
  additionalCss,
}: Container) {
  return (
    <>
      <div>{children}</div>
      <style jsx>{`
        div {
          width: ${widthPercentage}%;
          height: ${heightPercentage}%;
          box-shadow: ${shadow};
          border-radius: 15px;
          background-color: white;
          border: none;
          ${additionalCss}
        }
      `}</style>
    </>
  );
}
