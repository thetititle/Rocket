import styled from 'styled-components';
import { UserAvatar } from '../GlobalStyle';
import { useState } from 'react';
import { Itweet } from './TimeLine';
import SetTweetInfo from './SetTweetInfo';
import { auth } from '../firebase';
import TweetValue from './TweetValue';
import EditTweet from './EditTweet';

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
const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 24px;
`;
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
const BtnWrap = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
`;
const SnsBtnwarp = styled.div`
  display: flex;
  gap: 100px;
`;
const UserBtnWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const SnsBtn = styled.button`
  position: relative;
  width: 24px;
  height: 24px;
  background-color: transparent;
  color: transparent;
  padding: 0;
  border: none;
  border-radius: 0;
  display: block;
  align-items: center;
  justify-content: center;
  gap: 0;
  cursor: pointer;
  font-family: 'AppleSDGothicNeoEB00';
  transition: inherit;
  &:hover {
    background-color: transparent;
    color: transparent;
    transition: inherit;
  }
`;

export default function TweetList({
  id,
  text,
  createdTime,
  userName,
  imgUrl,
  userId,
}: Itweet) {
  const [isLikes, setLikes] = useState<boolean>(false);
  const [hasComment, setComment] = useState<boolean>(false);
  const [reTweet, setRetweet] = useState<boolean>(false);
  const [display, setDispaly] = useState<boolean>(false);
  const [isUpdate, setUpdate] = useState<boolean>(false);
  const user = auth.currentUser;
  const likeThisTweet = () => {
    setLikes(!isLikes);
  };
  const CommnetThisTweet = () => {
    setComment(!hasComment);
  };
  const ReTweet = () => {
    setRetweet(!reTweet);
  };
  const ShareTweet = () => {
    console.log('share modal');
  };
  const callBackFunc = (data: boolean) => {
    setUpdate(data);
  };
  const callBackFunc2 = (data: boolean) => {
    setUpdate(data);
    setDispaly(false);
  };

  return (
    <Wrapper>
      <UserAvatar />
      <TimeLineWrap>
        <UserInfoWrapper>
          <UserInfoWrap>
            <UserName>{userName}</UserName>
            <CreateTime>{createdTime}</CreateTime>
          </UserInfoWrap>
          {user?.uid === userId && !isUpdate ? (
            <UserBtnWrapper>
              <SnsBtn
                onFocus={() => setDispaly(true)}
                onBlur={() => setDispaly(false)}
              >
                <svg
                  fill="none"
                  strokeWidth={1.5}
                  stroke="#787878"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
                {display === true ? (
                  <SetTweetInfo
                    id={id}
                    userId={userId}
                    imgUrl={imgUrl}
                    isUpdate={isUpdate}
                    callBack={callBackFunc}
                  />
                ) : null}
              </SnsBtn>
            </UserBtnWrapper>
          ) : null}
        </UserInfoWrapper>
        {!isUpdate ? (
          <>
            <TweetValue text={text} imgUrl={imgUrl} />
            <BtnWrap>
              <SnsBtnwarp>
                <SnsBtn onClick={CommnetThisTweet}>
                  {hasComment ? (
                    <svg
                      fill="#1D9BF0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z"
                      />
                    </svg>
                  ) : (
                    <svg
                      fill="none"
                      strokeWidth={1.5}
                      stroke="#1D9BF0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                      />
                    </svg>
                  )}
                </SnsBtn>
                <SnsBtn onClick={likeThisTweet}>
                  {isLikes ? (
                    <svg
                      fill="#1D9BF0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                  ) : (
                    <svg
                      fill="none"
                      strokeWidth={1.5}
                      stroke="#1D9BF0"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  )}
                </SnsBtn>
                <SnsBtn onClick={ReTweet}>
                  <svg
                    fill="none"
                    strokeWidth={1.5}
                    stroke="#1D9BF0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                    />
                  </svg>
                </SnsBtn>
              </SnsBtnwarp>
              <SnsBtn onClick={ShareTweet}>
                <svg
                  fill="#1D9BF0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z"
                  />
                </svg>
              </SnsBtn>
            </BtnWrap>
          </>
        ) : (
          <EditTweet
            text={text}
            imgUrl={imgUrl}
            id={id}
            callBack={callBackFunc2}
          />
        )}
      </TimeLineWrap>
    </Wrapper>
  );
}
