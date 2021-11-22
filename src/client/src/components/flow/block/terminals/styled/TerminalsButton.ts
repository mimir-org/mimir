import styled from "styled-components";

interface Props {
  visible: boolean;
  input: boolean;
  parent: boolean;
}

/** Styled component that displays the button for showing the TerminalsMenu. */
const TerminalsButton = styled.div<Props>`
  opacity: ${(props) => (!props.visible ? 0 : 1)};
  position: absolute;
  top: 6px;
  cursor: pointer;
  transition: opacity 250ms ease-in-out;
  pointer-events: all;
  left: ${(props) => (props.input && props.parent ? "9px" : props.input && !props.parent ? "-1px" : "unset")};
  right: ${(props) => (!props.input && props.parent ? "7px" : !props.input && !props.parent ? "-1px" : "unset")};
  z-index: 6;
`;

export default TerminalsButton;
