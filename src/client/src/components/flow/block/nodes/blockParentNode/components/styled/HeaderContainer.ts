import styled from "styled-components";

interface Props {
  color: string;
}

const HeaderContainer = styled.div<Props>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  height: 30px;
  width: 100%;
  border-radius: 8px 8px 0 0;
  background-color: ${(props) => props.color};
  z-index: 1;
`;

export default HeaderContainer;
