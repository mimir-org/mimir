import styled from "styled-components";

interface Props {
  visible: boolean;
  input: boolean;
  parent: boolean;
}

/** Styled component that displays the button for showing the TerminalsMenu. */
const TerminalsBox = styled.div<Props>`
  visibility: ${(props) => !props.visible && "hidden"};
  position: absolute;
  top: 6px;
  cursor: pointer;
  z-index: 2;

  left: ${(props) => (props.input && props.parent ? "9px" : props.input && !props.parent ? "-1px" : "unset")};
  right: ${(props) => (!props.input && props.parent ? "7px" : !props.input && !props.parent ? "-1px" : "unset")};
`;

export default TerminalsBox;
