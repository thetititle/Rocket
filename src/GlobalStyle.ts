import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  :root{
    // color
    --bgColor: #020003;
    --fontDefault: #F5F5F5;
    --fontDesc: #787878;
    --highLight: #1D9BF0;

    //font
    --auth: 32px;
    --title: 20px;
    --subTitle: 18px;
    --BodyEB: 15px;
    --Body: 15px;
    --desc: 13px;
  }
  *{
    box-sizing : border-box;
  }
  body{
    background-color: var(--bgColor);
    color: var(--fontDefault);
    font-size: var(--Body);
  }
`;
