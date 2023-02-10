import styled from 'styled-components';
import illustration from '../../assets/images/illustration_hand_1.png';

export const TextHeader = styled.h1`
  font-size: 2rem;
  font-weight: 700;
`;

export const TextHeaderLight = styled.h1`
  font-size: 2.5rem;
  font-weight: 300;
`;

export const TextSpan = styled.span`
  text-decoration: underline;
`;

export const Container = styled.div`
  height: 100vh;
  margin: 0 auto;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  background-image: url(${illustration});
  background-repeat: no-repeat;
  background-position: bottom 0px right 0px;
`;

export const Button = styled.button``;
