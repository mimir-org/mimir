import styled from "styled-components";

const TerminalsBox = styled.div`
  visibility: ${(props) => !props.visible && "hidden"};
  position: absolute;
  right: ${(props) => (props.splitViewNode ? "-701px" : "-3px")};
  top: ${(props) => (props.parent ? "6px" : "-1px")};
  cursor: pointer;
  z-index: 1;
`;

export default TerminalsBox;
