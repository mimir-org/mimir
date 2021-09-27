import styled from "styled-components";
import { Position } from "react-flow-renderer";

/** Styled component for the terminals displayed on a node */
const HandleBox = styled.div`
  .react-flow__handle-block {
    position: absolute;
    background: url(${(props) => props.icon});
    visibility: ${(props) => (props.visible ? "visible" : "hidden")} !important;

    top: ${(props) =>
      props.position === Position.Left && !props.isParent
        ? props.input
        : props.position === Position.Right && !props.isParent
        ? props.output
        : props.position === Position.Left && props.isParent
        ? props.output
        : props.input}%;

    right: ${(props) => props.position === Position.Right && "-16px"};
    left: ${(props) => props.position === Position.Left && "-16px"};
  }
`;

export default HandleBox;
