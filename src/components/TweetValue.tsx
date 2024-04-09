import styled from 'styled-components';
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Photo = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;
export default function TweetValue({ text, imgUrl }: any) {
  return (
    <Wrapper>
      {text} {imgUrl ? <Photo src={imgUrl} /> : null}
    </Wrapper>
  );
}
