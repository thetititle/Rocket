import styled from 'styled-components';
export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;
`;
export const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export const Input = styled.input`
  padding: 0 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  line-height: 50px;
`;
export const Error = styled.span`
  font-family: 'AppleSDGothicNeoEB00';
  font-size: var(--desc);
  color: tomato;
  text-align: center;
`;
export const Switcher = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
export const BtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export const BtnLogo = styled.img`
  height: 25px;
`;
export const BigLogo = styled.img`
  height: 300px;
  object-fit: cover;
`;
