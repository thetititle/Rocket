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
  margin-top: 54px;
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
export default function TweetForm() {
  const user = auth.currentUser;
  const [text, setText] = useState('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [hasFile, setHasFile] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>('');

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
      // 최대용량 1MB 제한
      let maxSize = 1 * 1024 * 1024;
      let fileSize = files[0].size;
      if (fileSize > maxSize) {
        confirm(
          '로켓에 싣을 수 있는 파일의 최대용량은 1MB입니다.'
        );
        return;
      } else {
        setImgFile(files[0]);
        setHasFile(true);
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.addEventListener(
          'load',
          (e: ProgressEvent<FileReader>) => {
            if (!e || !e.target) return;
            const url: string = reader.result as string;
            setImgUrl(url);
          }
        );
        console.log('imgUrl1', imgUrl);
      }
    }
  };
  console.log('imgUrl2', imgUrl);
  const DeletePhoto = () => {
    setHasFile(false);
  };
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    if (!user || text === '' || text.length > 150) return;
    try {
      const doc = await addDoc(collection(db, 'tweets'), {
        text,
        createdTime: Date.now(),
        userName: user?.displayName || 'Anonymous',
        userId: user?.uid,
      });
      if (imgFile) {
        const locationRef = ref(
          storage,
          `tweets/${user.uid}/${doc.id}`
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
      setImgUrl('');
      setHasFile(false);
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
          {hasFile ? (
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
              <FileUpLoad htmlFor="originfile">
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
                name="originfile"
                onChange={upLoadImage}
                type="file"
                id="originfile"
                accept="image/*"
              />
            </FileWrap>
          )}

          <BtnPost>FIRE</BtnPost>
        </BtnWrap>
      </FormWrap>
    </Wrapper>
  );
}
