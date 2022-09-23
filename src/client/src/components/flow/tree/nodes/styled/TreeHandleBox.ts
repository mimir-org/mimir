import styled from "styled-components";
import { Position } from "react-flow-renderer";
import { TreeViewInputConnectorIcon } from "../../../../../assets/icons/connectors";

interface Props {
  visible: boolean;
  position: Position;
  topPos: string;
}

export const TreeHandleBox = styled.div<Props>`
  .function-treeview-handler {
    opacity: ${(props) => (props.visible ? 1 : 0)};
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};
    width: 19px;
    height: 19px;
    background: url(${TreeViewInputConnectorIcon});
    border-radius: 0;
    bottom: -18px;
    z-index: 1;
    right: ${(props) => props.position === Position.Right && 50}%;
    left: ${(props) => props.position === Position.Left && 50}%;
    top: ${(props) => props.topPos};
    transition: opacity 0.5s ease-in-out;
  }
`;
