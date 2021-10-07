import styled from "styled-components";

/** Styled component that displays the button for showing the TerminalsMenu. */
const TerminalsBox = styled.div`
  visibility: ${(props: { visible: boolean }) => !props.visible && "hidden"};
  position: absolute;
  top: ${(props: { mainConnectNode: boolean }) => (props.mainConnectNode ? 8 : 6)}px;
  cursor: pointer;
  z-index: 1;

  left: ${(props: { isInput: boolean; isParent: boolean }) =>
    props.isInput && props.isParent ? "9px" : props.isInput && !props.isParent ? "-1px" : "unset"};
  right: ${(props: { isInput: boolean; isParent: boolean }) =>
    !props.isInput && props.isParent ? "7px" : !props.isInput && !props.isParent ? "-1px" : "unset"};
`;

export default TerminalsBox;
