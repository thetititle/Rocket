import styled from 'styled-components';
import { UserAvatar } from '../GlobalStyle';
import { Itweet } from './TimeLine';
import { useEffect } from 'react';

// 트윗
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid var(--fontDefault);
`;
const TimeLineWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}`;
const UserInfoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const UserName = styled.span`
  font-family: 'AppleSDGothicNeoR00';
`;
const CreateTime = styled.span`
  font-size: var(--desc);
  color: var(--fontDesc);
  font-family: 'AppleSDGothicNeoR00';
`;
const TweetValue = styled.div`
  flex: 1;
`;
const Photo = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

export default function TweetList({
  text,
  createdTime,
  userName,
  imgUrl,
}: Itweet) {
  return (
    <Wrapper>
      <UserAvatar />
      <TimeLineWrap>
        <UserInfoWrap>
          <UserName>{userName}</UserName>
          <CreateTime>{createdTime}</CreateTime>
        </UserInfoWrap>
        <TweetValue>
          {text} {imgUrl ? <Photo src={imgUrl} /> : null}
        </TweetValue>
      </TimeLineWrap>
    </Wrapper>
  );
}
