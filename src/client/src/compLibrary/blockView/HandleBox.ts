import styled from "styled-components";
import { Position } from "react-flow-renderer";
import Size from "../size/Size";
import { ConnectorTreeViewIcon } from "../../assets/icons/blockView";

const HandleBox = styled.div`
  .react-flow__handle-block {
    position: relative;
    background: url(${ConnectorTreeViewIcon});
    visibility: ${(props) => (props.visible ? "visible" : "hidden")} !important;
    top: ${(props) =>
      props.position === Position.Right && !props.splitNode
        ? "-102"
        : props.position === Position.Left && !props.splitNode
        ? "-35"
        : props.splitNode && "-20"}px;
    right: ${(props) =>
      props.position === Position.Right && !props.mainConnectNode
        ? -Size.Node_Width - 2
        : -Size.ConnectView_Width - 2}px;
    left: -16px;

    margin-bottom: 3px;
  }
`;

export default HandleBox;
