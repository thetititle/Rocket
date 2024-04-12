import styled from 'styled-components';
import { auth, db, storage } from '../firebase';
import { useState } from 'react';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

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
const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
const PhotoWrap = styled.div`
  position: relative;
`;
const Photo = styled.img`
  width: auto;
  height: 50px;
  object-fit: cover;
  border-radius: 3px;
`;
const PhotoDeco = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    width: 24px;
  }
  &:hover {
    svg {
      fill: var(--highLight);
      background-color: transparent;
      stroke: transparent;
    }
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
  const [isDelete, setDelete] = useState<boolean>(false);

  const onclick = () => {
    callBack(false);
    setEditText('');
    setEditImgFile(null);
    setDelete(false);
  };
  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditText(e.target.value);
  };
  const DeletePhoto = () => {
    const Accept = confirm('정말로 이미지를 삭제합니까?');
    if (!Accept) return;
    setDelete(true);
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
    const EditDoc = doc(db, 'tweets', id);
    if (!user || editText === '' || editText.length > 150)
      return;

    try {
      const locationRef = ref(
        storage,
        `tweets/${user.uid}/${id}`
      );
      if (editimgFile) {
        const result = await uploadBytes(
          locationRef,
          editimgFile
        );
        const url = await getDownloadURL(result.ref);
        await updateDoc(EditDoc, { imgUrl: url });
      }

      if (isDelete) {
        try {
          const imgRef = ref(
            storage,
            `tweets/${user?.uid}/${id}`
          );
          await deleteObject(imgRef);
          await updateDoc(EditDoc, {
            imgUrl: null,
          });
        } catch (error) {
          console.log(error);
        }
      }
      await updateDoc(EditDoc, {
        text: editText,
      });

      setEditText('');
      setEditImgFile(null);
      setDelete(false);
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
        <Div>
          {!isDelete ? (
            imgUrl !== null ? (
              <PhotoWrap onClick={DeletePhoto}>
                <Photo src={imgUrl} />
                <PhotoDeco>
                  <svg
                    fill="#F5F5F5"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      clipRule="evenodd"
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                    />
                  </svg>
                </PhotoDeco>
              </PhotoWrap>
            ) : (
              <FileWrap>
                <FileUpLoad htmlFor="editfile">
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
                  name="editfile"
                  onChange={editImage}
                  type="file"
                  id="editfile"
                  accept="image/*"
                />
              </FileWrap>
            )
          ) : (
            <FileWrap>
              <FileUpLoad htmlFor="editfile">
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
                name="editfile"
                onChange={editImage}
                type="file"
                id="editfile"
                accept="image/*"
              />
            </FileWrap>
          )}
          <BtnWrap>
            <BtnQuit onClick={onclick}>CANCEL</BtnQuit>
            <BtnPost>FIRE</BtnPost>
          </BtnWrap>
        </Div>
      </FormWrap>
    </Wrapper>
  );
}
