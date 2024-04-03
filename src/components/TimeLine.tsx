import { useState } from 'react';
import styled from 'styled-components';
import TweetForm from './TweetForm';
import TweetList from './TweetList';

const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  border-right: 1px solid var(--fontDefault);
  border-left: 1px solid var(--fontDefault);
`;
// tab
const TabMenu = styled.ul`
  width: 100%;
  display: flex;
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

export default function TimeLine() {
  const [currentTab, setTab] = useState(0);
  const nameTab = [
    { name: 'For you', id: 1 },
    { name: 'Following you', id: 2 },
  ];
  const selectTabMenu = (index: number) => {
    setTab(index);
  };

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
      <TweetList />
    </Wrapper>
  );
}
