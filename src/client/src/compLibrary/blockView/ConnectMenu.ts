import styled from "styled-components";

const ConnectMenu = styled.div`
  visibility: ${(props) => !props.visible && "hidden"};
  position: absolute;
  left: -1px;
  top: 3px;
  cursor: pointer;
`;

export default ConnectMenu;
