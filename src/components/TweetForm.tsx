import styled from 'styled-components';
import { UserAvatar } from '../GlobalStyle';
import { useState } from 'react';
import {
  addDoc,
  collection,
  updateDoc,
} from 'firebase/firestore';
import { auth, db, storage } from '../firebase';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';

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
  const [imgFile, setImgFile] = useState<File | null>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText(e.target.value);
  };
  const upLoadImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;
    if (files) {
      setImgFile(files[0]);
    }
  };

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!user || text === '' || text.length > 150) return;
    try {
      const doc = await addDoc(collection(db, 'tweets'), {
        text,
        createTime: Date.now(),
        userName: user?.displayName || 'Anonymous',
        userId: user?.uid,
      });
      if (imgFile) {
        const locationRef = ref(
          storage,
          `tweets/${user.uid}-${user.displayName}/${doc.id}`
        );
        const result = await uploadBytes(
          locationRef,
          imgFile
        );
        const url = await getDownloadURL(result.ref);
        await updateDoc(doc, { imgUrl: url });
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setText('');
      setImgFile(null);
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
          value={text}
          onChange={onChange}
        ></TextArea>
        <BtnWrap>
          <FileWrap>
            <FileUpLoad htmlFor="file">
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
              name="file"
              onChange={upLoadImage}
              type="file"
              id="file"
              accept="image/*"
            />
          </FileWrap>
          <BtnPost>FIRE</BtnPost>
        </BtnWrap>
      </FormWrap>
    </Wrapper>
  );
}
