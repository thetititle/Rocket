import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 120px;
  z-index: 1;
  background-color: var(--bgColor);
  border: 1px solid var(--fontDesc);
  border-radius: 5px;
  padding: 10px;
  color: var(--fontDefault);
  text-align: left;
  font-size: var(--Body);
  font-family: 'AppleSDGothicNeoR00';
  box-shadow: 0 0px 12px 0 rgba(255, 255, 255, 0.15);
`;
export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
export const Li = styled.li`
  height: 27px;
  line-height: 27px;
  display: flex;
  flex: 1;
  align-items: center;
  gap: 5px;
  svg {
    width: 24px;
    height: auto;
  }
  &:hover {
    color: var(--highLight);
  }
`;
