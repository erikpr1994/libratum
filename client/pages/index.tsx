// import { useRouter } from 'next/router';

import Container from '../Layout/Container';
import Login from '../components/Login';

export default function Home() {
  // const router = useRouter();
  const handleClick = () => {
    // router.push('/dashboard');
    console.log('fired');
  };
  return (
    <>
      <Container
        widthPercentage={95}
        heightPercentage={95}
        additionalCss={`min-height: 600px`}
      >
        <Login click={handleClick} />
      </Container>
    </>
  );
}
