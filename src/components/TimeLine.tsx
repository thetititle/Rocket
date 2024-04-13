import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TweetForm from './TweetForm';
import TweetList from './TweetList';

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  border-right: 1px solid var(--fontDefault);
  border-left: 1px solid var(--fontDefault);
  overflow-y: scroll;
`;
// tab
const TabMenu = styled.ul`
  width: 598px;
  display: flex;
  position: fixed;
  background-color: var(--bgColor);
  z-index: 1;
  .menu {
    flex: 1;
    height: 54px;
    line-height: 54px;
    text-align: center;
    color: var(--fontDesc);
    font-family: 'AppleSDGothicNeoEB00';
    font-size: var(--subTitle);
    cursor: pointer;
    border-bottom: 1px solid var(--fontDefault);
  }
  .focus {
    border-bottom: 5px solid var(--highLight);
    color: var(--fontDefault);
  }
`;

import {
  collection,
  // getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../firebase';
import { Unsubscribe } from 'firebase/auth';

export interface Itweet {
  id: string;
  imgUrl?: string;
  text: string;
  userId: string;
  userName: string;
  createdTime: number;
}

export default function TimeLine() {
  const [currentTab, setTab] = useState(0);
  const [tweet, setTweet] = useState<Itweet[]>([]);
  const nameTab = [
    { name: 'For you', id: 1 },
    { name: 'Following you', id: 2 },
  ];
  const selectTabMenu = (index: number) => {
    setTab(index);
  };

  useEffect(() => {
    let unSubscribe: Unsubscribe | null = null;
    const fetchTweet = async () => {
      const tweetQuery = query(
        collection(db, 'tweets'),
        orderBy('createdTime', 'desc'),
        limit(25)
        // 계속 스크롤하면 25개씩 더 불러오도록 코드 추가
      );
      // const querySnapshot = await getDocs(tweetQuery);
      // const tweets = querySnapshot.docs.map((doc) => {
      //   const {
      //     text,
      //     createdTime,
      //     userId,
      //     userName,
      //     imgUrl,
      //   } = doc.data();
      //   return {
      //     id: doc.id,
      //     text,
      //     createdTime,
      //     userId,
      //     userName,
      //     imgUrl,
      //   };
      // });
      unSubscribe = await onSnapshot(
        tweetQuery,
        (snapshot) => {
          // 실시간 쿼리
          const tweets = snapshot.docs.map((doc) => {
            const {
              text,
              createdTime,
              userId,
              userName,
              imgUrl,
            } = doc.data();
            return {
              id: doc.id,
              text,
              createdTime,
              userId,
              userName,
              imgUrl,
            };
          });
          setTweet(tweets);
        }
      );
    };
    fetchTweet();
    return () => {
      unSubscribe && unSubscribe();
    };
  }, []);

  return (
    <Wrapper>
      <TabMenu>
        {/* <li>{nameTab[0].name}</li>
        <li>{nameTab[1].name}</li> */}
        {nameTab.map((tab, index) => (
          <li
            key={tab.id}
            className={
              index === currentTab ? 'menu focus' : 'menu'
            }
            onClick={() => {
              selectTabMenu(index);
            }}
          >
            {tab.name}
          </li>
        ))}
      </TabMenu>
      <TweetForm />
      {tweet.map((t) => (
        <TweetList key={t.id} {...t} />
      ))}
    </Wrapper>
  );
}
