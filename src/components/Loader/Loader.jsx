import { Triangle } from 'react-loader-spinner';
import { Container } from './Loader.styled';

export const Loader = () => {
  return (
    <Container>
      <Triangle
        height="200"
        width="200"
        color="#034961"
        ariaLabel="triangle-loading"
        visible={true}
      />
    </Container>
  );
};
