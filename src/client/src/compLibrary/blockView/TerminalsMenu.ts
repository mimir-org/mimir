import styled from "styled-components";

const TerminalsMenu = styled.div`
  visibility: ${(props) => !props.visible && "hidden"};
  position: absolute;
  right: -1px;
  top: -1px;
  cursor: pointer;
`;

export default TerminalsMenu;