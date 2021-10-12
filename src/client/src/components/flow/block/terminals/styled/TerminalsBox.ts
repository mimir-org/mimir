import styled from "styled-components";

interface Props {
  visible: boolean;
  mainConnectNode: boolean;
  isInput: boolean;
  isParent: boolean;
}

/** Styled component that displays the button for showing the TerminalsMenu. */
const TerminalsBox = styled.div<Props>`
  visibility: ${(props) => !props.visible && "hidden"};
  position: absolute;
  top: ${(props) => (props.mainConnectNode ? 8 : 6)}px;
  cursor: pointer;
  z-index: 1;

  left: ${(props) => (props.isInput && props.isParent ? "9px" : props.isInput && !props.isParent ? "-1px" : "unset")};
  right: ${(props) => (!props.isInput && props.isParent ? "7px" : !props.isInput && !props.isParent ? "-1px" : "unset")};
`;

export default TerminalsBox;
