import { ReactNode } from 'react';
import { NProgress } from '@tanem/react-nprogress';

import { shadow } from '../../styles/theme.js';

import Bar from 'Components/Bar';

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
  isLoading = false,
}: ContainerType) {
  return (
    <>
      <NProgress isAnimating={isLoading} animationDuration={100}>
        {({ animationDuration, isFinished, progress }) => (
          <div className="container">
            <Bar
              progress={progress}
              isLoading={isLoading}
              animationDuration={animationDuration}
            />
            <article className={title ? 'title-wrapper' : ''}>
              {!isLoading && title && <h1>{title}</h1>}
            </article>
            <article className="children">{children}</article>
          </div>
        )}
      </NProgress>
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
          grid-template-rows: 0 ${title ? '60px' : 0} 1fr;
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
          position: relative;
          overflow: hidden;
          ${additionalCssForChildren}
        }
      `}</style>
    </>
  );
}
