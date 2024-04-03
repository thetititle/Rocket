import styled from 'styled-components';
export const TabMenu = styled.ul`
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

export const TweetForm = styled.form`
  height: 120px;
  border-bottom: 1px solid var(--fontDefault);
  padding: 10px 20px;
  display: flex;
  gap: 10px;
`;
export const FormWrap = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export const UserIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50px;
  object-fit: cover;
`;
export const TextArea = styled.textarea`
  flex: 1;
  height: 60px;
  resize: none;
  border: 1px solid var(--fontDesc);
  padding: 5px;
  color: var(--fontDefault);
  background-color: transparent;
  border-radius: 5px;
  &:focus {
    outline: none;
    border-color: transparent;
  }
  &::placeholder {
    font-size: var(--Body);
    font-family: 'AppleSDGothicNeoR00';
  }
`;
export const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const FileWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  padding: 0 5px;
`;
export const BtnPost = styled.button`
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
export const FileInput = styled.input`
  display: none;
`;
export const FileUpLoad = styled.label`
  cursor: pointer;
  svg {
    width: 24px;
    height: auto;
  }
`;
