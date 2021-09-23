import styled from "styled-components";

/** Styled component that displays the button for showing the TerminalsMenu */
const TerminalsBox = styled.div`
  visibility: ${(props) => !props.visible && "hidden"};
  position: absolute;
  right: ${(props) => (props.isSplitView ? "-722px" : "-3px")};
  top: ${(props) => (props.parent ? "6px" : "3px")};
  cursor: pointer;
  z-index: 1;
`;

export default TerminalsBox;
