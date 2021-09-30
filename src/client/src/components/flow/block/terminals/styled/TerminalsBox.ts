import styled from "styled-components";

/** Styled component that displays the button for showing the TerminalsMenu. */
const TerminalsBox = styled.div`
  visibility: ${(props) => !props.visible && "hidden"};
  position: absolute;

  left: ${(props) =>
    props.isInput && props.isParent
      ? "9px"
      : props.isInput && !props.isParent
      ? "-1px"
      : "unset"};

  right: ${(props) =>
    !props.isInput && props.isParent
      ? "7px"
      : !props.isInput && !props.isParent
      ? "-1px"
      : "unset"};

  top: 6px;
  cursor: pointer;
  z-index: 1;
`;

export default TerminalsBox;
