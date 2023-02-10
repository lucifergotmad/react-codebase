import {
  Container,
  TextHeader,
  TextHeaderLight,
  TextSpan,
} from './home.styles';

const HomePage = () => {
  return (
    <Container>
      <TextHeader>Hi, There</TextHeader>
      <TextHeaderLight>
        We prepare the login template <TextSpan>for u</TextSpan>
      </TextHeaderLight>
    </Container>
  );
};

export default HomePage;
