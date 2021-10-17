import styled from "styled-components";

interface Props {
  visible: boolean;
  mainConnectNode: boolean;
  input: boolean;
  parent: boolean;
}

/** Styled component that displays the button for showing the TerminalsMenu. */
const TerminalsBox = styled.div<Props>`
  visibility: ${(props) => !props.visible && "hidden"};
  position: absolute;
  top: ${(props) => (props.mainConnectNode ? 8 : 6)}px;
  cursor: pointer;
  z-index: 1;

  left: ${(props) => (props.input && props.parent ? "9px" : props.input && !props.parent ? "-1px" : "unset")};
  right: ${(props) => (!props.input && props.parent ? "7px" : !props.input && !props.parent ? "-1px" : "unset")};
`;

export default TerminalsBox;
