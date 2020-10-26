import { ReactNode, useContext } from 'react';

import { NProgress } from '@tanem/react-nprogress';
import { isLoadedContext } from '../../hooks/useLoading';

import Bar from './Bar';

type ContainerType = {
  children: ReactNode;
};

const Container = ({ children }: ContainerType) => {
  const { loaded } = useContext(isLoadedContext);

  return (
    <NProgress isAnimating={!loaded} animationDuration={100}>
      {({ animationDuration, progress }) => (
        <main>
          <div
            style={{
              opacity: !loaded ? 1 : 0,
              pointerEvents: 'none',
              transition: `opacity ${animationDuration}ms linear`,
            }}
          >
            <Bar progress={progress} animationDuration={animationDuration} />
          </div>
          {children}
        </main>
      )}
    </NProgress>
  );
};

export default Container;
