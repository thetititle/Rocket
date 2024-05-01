import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../logo.svg';
import homeIcon from '../asset/img/rocket.png';
import exporteIcon from '../asset/img/expore.png';
import notificatuonIcon from '../asset/img/notification.png';
import bookmarkIcon from '../asset/img/bookmark.png';

export const Wrapper = styled.div`
  flex: 1;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Wrap = styled.div``;
export const Logo = styled.img`
  height: 54px;
  object-fit: cover;
  padding: 5px;
`;
export const Icon = styled.img`
  height: 20px;
  object-fit: cover;
`;
export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
export const Li = styled.li`
  line-height: 54px;
  opacity: 0.25;
  a {
    align-items: center;
    gap: 10px;
    display: flex;
    color: inherit;
  }
  &.active {
    opacity: 1;
  }
`;
export const NavWrap = styled.div`
  flex: 1;
`;
export const FireBtn = styled.button`
  color: var(--fontDefault);
  background-color: var(--highLight);
  &:hover {
    color: var(--fontDefault);
    background-color: var(--highLight);
  }
`;
export const User = styled.div``;

export default function Navigation() {
  const navClick = (e: React.MouseEvent) => {
    // var Current = e.currentTarget;
    // var Next = Current.nextElementSibling;
    // var Prev = Current.previousElementSibling;
  };
  const showPostModal = () => {
    console.log('showModal');
  };
  return (
    <Wrapper>
      <Wrap>
        <Link to="/home">
          <Logo src={logo} />
        </Link>
        <Ul id="navWrap">
          <Li onClick={navClick}>
            <NavLink to="/home">
              <Icon src={homeIcon} />
              <h2>Home</h2>
            </NavLink>
          </Li>
          <Li onClick={navClick}>
            <NavLink to="#">
              <Icon src={exporteIcon} />
              <h2>Expore</h2>
            </NavLink>
          </Li>
          <Li onClick={navClick}>
            <NavLink to="#">
              <Icon src={notificatuonIcon} />
              <h2>Notification</h2>
            </NavLink>
          </Li>
          <Li onClick={navClick}>
            <NavLink to="#">
              <Icon src={bookmarkIcon} />
              <h2>Bookmark</h2>
            </NavLink>
          </Li>
        </Ul>
        <FireBtn onClick={showPostModal}>
          <h2>FIRE</h2>
        </FireBtn>
      </Wrap>
      <User>유저</User>
    </Wrapper>
  );
}
