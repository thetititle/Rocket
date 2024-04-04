import styled from 'styled-components';
import { UserAvatar } from '../GlobalStyle';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';

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

export interface Itweet {
  id: string;
  imgUrl?: string;
  text: string;
  userId: string;
  userName: string;
  createTime: number;
}

export default function TweetList() {
  const [tweet, setTweet] = useState<Itweet[]>([]);
  useEffect(() => {
    // const fetchTweet = async () => {
    //   const querySnapshot = await getDocs(
    //     collection(db, 'tweets')
    //   );
    //   querySnapshot.forEach((doc) => {
    //     console.log(doc);
    //   });
    // };
  }, []);

  return (
    <Wrapper>
      <UserAvatar />
      <TimeLineWrap>
        <UserInfoWrap>
          <UserName>{'이름'}</UserName>
          <CreateTime>{'시간'}</CreateTime>
        </UserInfoWrap>
        <TweetValue></TweetValue>
      </TimeLineWrap>
    </Wrapper>
  );
}
