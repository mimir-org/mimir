import styled from "styled-components";

const ConnectMenu = styled.div`
  visibility: ${(props) => !props.visible && "hidden"};
  position: absolute;
  left: -1px;
  top: -1px;
  cursor: pointer;
`;

export default ConnectMenu;
