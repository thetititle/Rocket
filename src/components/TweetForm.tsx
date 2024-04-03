import styled from 'styled-components';
import { UserAvatar } from '../GlobalStyle';
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Wrapper = styled.form`
  height: 120px;
  border-bottom: 1px solid var(--fontDefault);
  padding: 10px 20px;
  display: flex;
  gap: 10px;
`;
const FormWrap = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;
const TextArea = styled.textarea`
  flex: 1;
  height: 60px;
  resize: none;
  border: 1px solid rgba(120, 120, 120, 0.25);
  padding: 5px;
  color: var(--fontDefault);
  background-color: transparent;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
  &::placeholder {
    font-size: var(--Body);
    font-family: 'AppleSDGothicNeoR00';
  }
`;
const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const FileWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 0 5px;
`;
const BtnPost = styled.button`
  height: 30px;
  width: auto;
  padding: 0 15px;
  color: var(--fontDefault);
  background-color: var(--highLight);
  &:hover {
    color: var(--fontDefault);
    background-color: var(--highLight);
  }
`;
const FileInput = styled.input`
  display: none;
`;
const FileUpLoad = styled.label`
  cursor: pointer;
  svg {
    width: 24px;
    height: auto;
  }
`;

export default function TweetForm() {
  const user = auth.currentUser;
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [gif, setGig] = useState<File | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };
  const upLoadPhoto = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log('포토', e);
  };
  const upLoadGif = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log('gif', e);
  };
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!user || text === '' || text.length > 150) return;
    try {
      await addDoc(collection(db, 'tweets'), {
        text,
        createTime: Date.now(),
        userName: user?.displayName || 'Anonymous',
        userId: user?.uid,
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Wrapper onSubmit={onSubmit}>
      <UserAvatar />
      <FormWrap>
        <TextArea
          placeholder="무슨 일이 있나요?"
          maxLength={150}
          required
          onChange={onChange}
        ></TextArea>
        <BtnWrap>
          <FileWrap>
            <FileUpLoad htmlFor="Photo">
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
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </FileUpLoad>
            <FileInput
              onChange={upLoadPhoto}
              type="file"
              id="Photo"
              accept="image/png, image/jpeg, image/jpg"
            />
            <FileUpLoad htmlFor="Gif">
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
                  d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
            </FileUpLoad>
            <FileInput
              onChange={upLoadGif}
              type="file"
              id="Gif"
              accept="image/gif"
            />
          </FileWrap>
          <BtnPost>FIRE</BtnPost>
        </BtnWrap>
      </FormWrap>
    </Wrapper>
  );
}
