import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import AppleSDGothicNeoEB00 from './asset/font/AppleSDGothicNeoB00.woff';
import AppleSDGothicNeoH00 from './asset/font/AppleSDGothicNeoH00.woff';
import AppleSDGothicNeoR00 from './asset/font/AppleSDGothicNeoR00.woff';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  :root{
    // color
    --bgColor: #020003;
    --fontDefault: #F5F5F5;
    --fontDesc: #787878;
    --highLight: #1D9BF0;
    --error: tomato;

    //font
    --auth: 32px;
    --title: 20px;
    --subTitle: 18px;
    --BodyEB: 15px;
    --Body: 15px;
    --desc: 13px;
  }

  @font-face {
    font-family: 'AppleSDGothicNeoEB00';
    src: local('AppleSDGothicNeoEB00'), local('AppleSDGothicNeoEB00');
    font-style: normal;
    src: url(${AppleSDGothicNeoEB00}) format('woff');
  }
  @font-face {
    font-family: 'AppleSDGothicNeoH00';
    src: local('AppleSDGothicNeoH00'), local('AppleSDGothicNeoH00');
    font-style: normal;
    src: url(${AppleSDGothicNeoH00}) format('woff');
  }
  @font-face {
    font-family: 'AppleSDGothicNeoR00';
    src: local('AppleSDGothicNeoR00'), local('AppleSDGothicNeoR00');
    font-style: normal;
    src: url(${AppleSDGothicNeoR00}) format('woff');
  }
  *{
    box-sizing : border-box;
  }
  body{
    background-color: var(--bgColor);
    font-family: 'AppleSDGothicNeoR00';
    color: var(--fontDefault);
    font-size: var(--Body);
  }
  a{
    // color: inherit;
    color: var(--highLight);
    text-decoration: none;
  }
  ::-webkit-scrollbar {
    display:none;
  }
  h1{
    font-family: 'AppleSDGothicNeoEB00';
    font-size: var(--auth);
    text-align: center;
  }
  h2{
    font-family: 'AppleSDGothicNeoEB00';
    font-size: var(--title);
  }
  h3{
    font-family: 'AppleSDGothicNeoEB00';
    font-size: var(--subTitle);
  }
  p.bodyEB{
    font-family: 'AppleSDGothicNeoEB00';
    font-size: var(--BodyEB);
  }
  p.bodyDESC{
    font-family: 'AppleSDGothicNeoEB00';
    font-size: var(--desc);
    color: var(--fontDesc);
  }
  p.error{
    font-family: 'AppleSDGothicNeoEB00';
    font-size: var(--desc);
    color: var(tomato);
  }
  input{
    &[type='submit'] {
      cursor: pointer;
      font-family: 'AppleSDGothicNeoEB00';
      font-size: var(--subTitle);
      background-color: #0060a1;
      color: var(--fontDefault);
      transition: 0.3s;
      &:hover {
        background-color: var(--highLight);
        transition: 0.3s;
      }
    }
  }
  button{
    width: 100%;
    height: 50px;
    background-color: var(--fontDefault);
    color: var(--fontDesc);
    padding: 0 20px;
    border: none;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    font-family: 'AppleSDGothicNeoEB00';
    transition: 0.3s;
    &:hover {
      background-color: #ffffff;
      color: var(--bgColor);
      transition: 0.3s;
    }
  }
  button.border{
    width: 100%;
    height: 50px;
    background-color: transparent;
    padding: 0 20px;
    border: 1px solid var(--fontDefault);
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    cursor: pointer;
    transition: 0.3s;
    font-size: var(--subTitle);
    span {
      color: var(--fontDefault);
      line-height: 50px;
      font-size: 18px;
      font-family: 'AppleSDGothicNeoEB00';
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
      color: var(--fontDefault);
      transition: 0.3s;
    }
  }
  .hidden{
    display: none;
  }
`;
