import styled from 'styled-components';
export const ModalWapper = styled.div`
  position: absolute;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
`;
export const Modal = styled.div`
  width: 400px;
  background-color: var(--fontDefault);
  padding: 30px;
  border-radius: 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0px 12px 0 rgba(255, 255, 255, 0.5);
  color: var(--bgColor);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export const Span = styled.span`
  color: var(--bgColor);
  line-height: 1.5;
  text-align: center;
`;
export const Input = styled.input`
  padding: 0 20px;
  border-radius: 50px;
  border: 1px solid gray;
  width: 100%;
  line-height: 50px;
  transition: 0.3s;
  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: inset 0 0 0 5px var(--highLight);
    transition: 0.3s;
  }
  &[type='submit'] {
    cursor: pointer;
    font-family: 'AppleSDGothicNeoEB00';
    background-color: #0060a1;
    color: var(--fontDefault);
    border-color: transparent;
    transition: 0.3s;
    &:hover {
      background-color: var(--highLight);
      transition: 0.3s;
    }
  }
`;
export const CloseButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.8);
  color: var(--fontDefault);
  font-size: var(--subTitle);
  font-family: 'AppleSDGothicNeoEB00';
  padding: 0 20px;
  border: none;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: var(--bgColor);
    transition: 0.3s;
    color: var(--fontDefault);
  }
`;
export const BtnWrap = styled.div`
  display: flex;
  gap: 5px;
`;
