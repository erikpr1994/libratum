import { ReactNode, useContext } from 'react';

import { shadow } from '../../styles/theme.js';

import { isLoadedContext } from 'hooks/useLoading';

type ContainerType = {
  widthPercentage: number;
  heightPercentage: number;
  children: ReactNode;
  title?: string;
  additionalCss?: string;
  additionalCssForChildren?: string;
  isLoading?: boolean;
};

export default function Container({
  children,
  widthPercentage,
  heightPercentage,
  additionalCss,
  title,
  additionalCssForChildren,
}: ContainerType) {
  const { loaded } = useContext(isLoadedContext);

  return (
    <>
      <div className="container">
        <article className={title ? 'title-wrapper' : ''}>
          {loaded && title && <h1>{title}</h1>}
        </article>
        <article className="children">{children}</article>
      </div>

      <style jsx>{`
        .container {
          width: ${widthPercentage}%;
          height: ${heightPercentage}%;
          box-shadow: ${shadow};
          border-radius: 15px;
          background-color: white;
          border: none;
          overflow: hidden;
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: ${title ? '60px' : 0} 1fr;
          ${additionalCss}
        }

        .title-wrapper {
          padding: 1em 1em 0 1em;
          background: white;
          text-transform: uppercase;
          position: sticky;
          top: 0;
        }

        .children {
          overflow: hidden;
          position: relative;

          ${additionalCssForChildren}
        }
      `}</style>
    </>
  );
}
