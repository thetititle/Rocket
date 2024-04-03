import { useState } from 'react';
import styled from 'styled-components';
import {
  TabMenu,
  TweetForm,
  UserIcon,
  FormWrap,
  TextArea,
  BtnWrap,
  FileWrap,
  BtnPost,
  FileInput,
  FileUpLoad,
} from './TweetCompoenet';

export const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
  border-right: 1px solid var(--fontDefault);
  border-left: 1px solid var(--fontDefault);
`;

export default function TimeLine() {
  const [currentTab, setTab] = useState(0);
  const nameTab = [
    { name: 'For you', content: 'tab1' },
    { name: 'Following you', content: 'tab1' },
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
      <TweetForm>
        <UserIcon />
        <FormWrap>
          <TextArea
            placeholder="무슨 일이 있나요?"
            maxLength={150}
            required
          ></TextArea>
          <BtnWrap>
            <FileWrap>
              <FileUpLoad htmlFor="Photo">
                <svg
                  fill="#F5F5F5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                  />
                </svg>
              </FileUpLoad>
              <FileInput
                type="file"
                id="Photo"
                accept="image/png, image/jpeg, image/jpg"
              />
              <FileUpLoad htmlFor="Gif">
                <svg
                  fill="#F5F5F5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm9 4.5a.75.75 0 0 0-1.5 0v7.5a.75.75 0 0 0 1.5 0v-7.5Zm1.5 0a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5H16.5v2.25H18a.75.75 0 0 1 0 1.5h-1.5v3a.75.75 0 0 1-1.5 0v-7.5ZM6.636 9.78c.404-.575.867-.78 1.25-.78s.846.205 1.25.78a.75.75 0 0 0 1.228-.863C9.738 8.027 8.853 7.5 7.886 7.5c-.966 0-1.852.527-2.478 1.417-.62.882-.908 2-.908 3.083 0 1.083.288 2.201.909 3.083.625.89 1.51 1.417 2.477 1.417.967 0 1.852-.527 2.478-1.417a.75.75 0 0 0 .136-.431V12a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0 0 1.5H9v1.648c-.37.44-.774.602-1.114.602-.383 0-.846-.205-1.25-.78C6.226 13.638 6 12.837 6 12c0-.837.226-1.638.636-2.22Z"
                  />
                </svg>
              </FileUpLoad>
              <FileInput
                type="file"
                id="Gif"
                accept="image/gif"
              />
            </FileWrap>
            <BtnPost>FIRE</BtnPost>
          </BtnWrap>
        </FormWrap>
      </TweetForm>
    </Wrapper>
  );
}
