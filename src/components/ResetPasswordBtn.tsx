import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import {
  ModalWapper,
  Modal,
  Form,
  Input,
  Span,
  CloseButton,
  BtnWrap,
} from './ModalComponent';
import { useState } from 'react';
export default function ResetPasswordBtn() {
  const [email, setEmail] = useState('');
  const [display, setDispaly] = useState({
    display: 'none',
  });
  const openModal = () => {
    setDispaly({ display: 'block' });
  };
  const closeModal = () => {
    setDispaly({ display: 'none' });
  };
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(e.target.value);
  };
  const changePassword = async () => {
    await sendPasswordResetEmail(auth, email);
  };
  return (
    <>
      <button className="border" onClick={openModal}>
        비밀번호를 잊으셨나요?
      </button>
      <ModalWapper style={display}>
        <Modal>
          <h1>🔐비밀번호 재설정</h1>
          <Span>
            비밀번호 재설정 메일을 통해 비밀번호를
            변경하려면
            <br /> 계정에 연결된 이메일을 입력하세요.
          </Span>
          <Form onSubmit={changePassword}>
            <Input
              name="email"
              placeholder="가입한 Email입력"
              type="email"
              value={email}
              required
              onChange={onChange}
            />
            <BtnWrap>
              <Input type="submit" value="재설정" />
              <CloseButton onClick={closeModal}>
                취소
              </CloseButton>
            </BtnWrap>
          </Form>
        </Modal>
      </ModalWapper>
    </>
  );
}
