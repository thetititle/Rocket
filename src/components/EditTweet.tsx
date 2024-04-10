import styled from 'styled-components';
import { auth, db, storage } from '../firebase';
import { useState } from 'react';
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import {
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';

const Wrapper = styled.form`
  height: 120px;
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
  font-family: 'AppleSDGothicNeoR00';
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
const BtnQuit = styled.button`
  height: 30px;
  width: auto;
  padding: 0 15px;
  margin-right: 10px;
  color: var(--fontDefault);
  background-color: tomato;
  &:hover {
    color: var(--fontDefault);
    background-color: tomato;
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

export default function EditTweet({
  text,
  imgUrl,
  callBack,
  id,
}: any) {
  const user = auth.currentUser;
  const [editimgFile, setEditImgFile] =
    useState<File | null>(null);
  const [editText, setEditText] = useState(text);

  const onclick = () => {
    callBack(false);
  };

  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditText(e.target.value);
  };
  const editImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { files } = e.target;
    if (files) {
      let maxSize = 1 * 1024 * 1024;
      let fileSize = files[0].size;
      if (fileSize > maxSize) {
        confirm('첨부파일 최대용량은 1MB입니다.');
        return;
      } else {
        setEditImgFile(files[0]);
      }
    }
  };
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!user || editText === '' || editText.length > 150)
      return;
    try {
      const editRef = doc(db, 'tweets', id);
      await updateDoc(editRef, {
        text: editText,
      });
      // if(editimgFile){

      // }
      setEditText('');
    } catch (error) {
      console.log(error);
    } finally {
      callBack(false);
    }
  };

  return (
    <Wrapper onSubmit={onSubmit}>
      <FormWrap>
        <TextArea
          placeholder="무슨 일이 있나요?"
          maxLength={150}
          required
          value={editText}
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
              onChange={editImage}
              type="file"
              id="file"
              accept="image/*"
            />
          </FileWrap>
          <BtnQuit onClick={onclick}>CANCEL</BtnQuit>
          <BtnPost>FIRE</BtnPost>
        </BtnWrap>
      </FormWrap>
    </Wrapper>
  );
}
