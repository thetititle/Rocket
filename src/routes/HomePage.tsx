import Aside from '../components/Aside';
import Navigation from '../components/Navigation';
import TimeLine from '../components/TimeLine';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1320px;
  width: 100%;
  margin: 0 auto;
  height: 100vh;
`;
const Wrap = styled.div`
  display: flex;
  height: 100%;
`;

export default function HomePage() {
  return (
    <Wrapper>
      <Wrap>
        <Navigation />
        <TimeLine />
        <Aside />
      </Wrap>
    </Wrapper>
  );
}
