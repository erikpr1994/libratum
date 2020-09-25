import PropTypes from 'prop-types';
import Bar from './Bar';

const Container = ({ isLoading, animationDuration, progress }) => (
  <div
    style={{
      opacity: isLoading ? 1 : 0,
      pointerEvents: 'none',
      transition: `opacity ${animationDuration}ms linear`,
    }}
  >
    <Bar progress={progress} animationDuration={animationDuration} />
  </div>
);

Container.propTypes = {
  animationDuration: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Container;
