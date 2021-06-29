import styled from "styled-components";
import { Position } from "react-flow-renderer";
import Size from "../size/Size";

const HandleBox = styled.div`
  .react-flow__handle-block {
    position: absolute;
    background: url(${(props) => props.icon});
    visibility: ${(props) => (props.visible ? "visible" : "hidden")} !important;
    /* top: ${(props) =>
      props.position === Position.Right && !props.splitNode
        ? -props.outputYPos
        : props.position === Position.Left && !props.splitNode
        ? -props.inputYPos / 3
        : props.splitNode && "-10"}px;
    right: ${(props) =>
      props.position === Position.Right && !props.mainConnectNode
        ? -Size.Node_Width - 2
        : -Size.ConnectView_Width - 2}px;
    left: ${(props) => props.position === Position.Left && "-16"}px; */
    margin-bottom: 3px;
    top: ${(props) => props.order}% !important;
    right: ${(props) => props.position === Position.Right && "-16px"};
    left: ${(props) => props.position === Position.Left && "-16px"};
  }

  .react-flow__handle-right {
    top: ${(props) => props.order}% !important;
  }
`;

export default HandleBox;
