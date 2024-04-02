import { Link } from 'react-router-dom';
import {
  Wrapper,
  Wrap,
  FormWrap,
  Form,
  Input,
  BigLogo,
  Switcher,
  BtnWrap,
  BtnLogo,
  Error,
} from '../components/AuthComponent';
import logo from '../logo.svg';
import GithubLogo from '../asset/img/github-logo.svg';
import GoogleLogo from '../asset/img/google-logo.svg';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';

export default function CreateAccount() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // input값이 바뀔 때 이벤트
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    // e를 name과 value로 받겠다.
    const {
      target: { name, value },
    } = e;
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      const credential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      await updateProfile(credential.user, {
        displayName: name,
      });
      navigate('/home');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
    }
  };
  return (
    <Wrapper>
      <Wrap>
        <BigLogo src={logo} />
        <FormWrap>
          <h1>Join in Rocket🚀</h1>
          <Form onSubmit={onSubmit}>
            <Input
              name="name"
              placeholder="이름"
              type="name"
              required
              onChange={onChange}
              value={name}
            />
            <Input
              name="email"
              placeholder="이메일"
              type="email"
              required
              onChange={onChange}
              value={email}
            />
            <Input
              name="password"
              placeholder="비밀번호"
              type="password"
              required
              onChange={onChange}
              value={password}
            />
            <Input type="submit" value="BORAD" />
          </Form>
          {error !== '' ? <Error>{error}</Error> : null}
          <Switcher>
            이미 계정이 있으신가요?{' '}
            <Link to="/Login">로그인</Link>
          </Switcher>
          <BtnWrap>
            <button>
              <BtnLogo src={GoogleLogo} />
              Join with Google
            </button>
            <button>
              <BtnLogo src={GithubLogo} />
              Join with Github
            </button>
          </BtnWrap>
        </FormWrap>
      </Wrap>
    </Wrapper>
  );
}
