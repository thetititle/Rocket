import { Link, useNavigate } from 'react-router-dom';
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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import {
  GithubAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import ResetPasswordBtn from '../components/ResetPasswordBtn';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'email') {
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
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigate('/home');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    }
  };
  const loginGithub = () => {
    try {
      const provider = new GithubAuthProvider();
      console.log('깃헙로그인', provider);
      signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    }
  };
  const loginGoogle = () => {
    try {
      const provider = new GoogleAuthProvider();
      console.log('구글로그인', provider);
      signInWithPopup(auth, provider);
      navigate('/home');
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    }
  };

  return (
    <Wrapper>
      <Wrap>
        <BigLogo src={logo} />
        <FormWrap>
          <h1>Sign in Rocket🚀</h1>
          <Form onSubmit={onSubmit}>
            <Input
              name="email"
              placeholder="Email"
              type="email"
              required
              onChange={onChange}
            />
            <Input
              name="password"
              placeholder="Password"
              type="password"
              required
              onChange={onChange}
            />
            <Input type="submit" value="BORAD" />
          </Form>
          {error !== '' ? <Error>{error}</Error> : null}
          <Switcher>
            계정이 없으신가요?{' '}
            <Link to="/CreateAccount">회원가입</Link>
          </Switcher>
          <BtnWrap>
            <button onClick={loginGoogle}>
              <BtnLogo src={GoogleLogo} />
              Login with Google
            </button>
            <button onClick={loginGithub}>
              <BtnLogo src={GithubLogo} />
              Login with Github
            </button>
            <ResetPasswordBtn />
          </BtnWrap>
        </FormWrap>
      </Wrap>
    </Wrapper>
  );
}
