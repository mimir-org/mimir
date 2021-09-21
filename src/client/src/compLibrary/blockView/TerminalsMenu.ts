import styled from "styled-components";

const TerminalsMenu = styled.div`
  visibility: ${(props) => !props.visible && "hidden"};
  position: absolute;
  right: ${(props) => (props.parent ? "-3px" : "-1px")};
  top: ${(props) => (props.parent ? "6px" : "-1px")};
  cursor: pointer;
  z-index: 1;
`;

export default TerminalsMenu;
