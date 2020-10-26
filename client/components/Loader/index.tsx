import ContentLoader from 'react-content-loader';

import { colors } from '../../styles/theme';

const Loader = (props) => (
  <ContentLoader
    viewBox="0 0 400 160"
    height={60}
    width={400}
    speed={2}
    backgroundColor={colors['Black Coral']}
    foregroundColor={colors['Vivid Sky Blue']}
    uniqueKey="vsfbdsb"
    {...props}
  >
    <circle cx="150" cy="86" r="8" />
    <circle cx="194" cy="86" r="8" />
    <circle cx="238" cy="86" r="8" />
  </ContentLoader>
);

export default Loader;
