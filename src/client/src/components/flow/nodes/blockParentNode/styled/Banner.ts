import styled from "styled-components";

const Header = styled.div`
  position: absolute;
  top: 0.3px;
  height: 30px;
  width: 100%;
  border-radius: 10px 10px 0px 0px;
  background-color: ${(props: { color: string }) => props.color};
`;

export default Header;
