import styled from "styled-components";
import { Position } from "react-flow-renderer";
import { TreeViewConnectorIcon } from "../../../../../assets/icons/connectors";

interface Props {
  visible: boolean;
  position: Position;
  topPos: string;
  rightPos?: number;
  leftPos?: number;
}

export const TreeHandleBox = styled.div<Props>`
  .function-treeview-handler {
    opacity: ${(props) => (props.visible ? 1 : 0)};
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};
    width: 19px;
    height: 19px;
    background: url(${TreeViewConnectorIcon});
    border-radius: 0;
    bottom: -19px;
    z-index: 1;
    right: ${(props) => props.position === Position.Right && props.rightPos}px;
    left: ${(props) => props.position === Position.Left && props.leftPos}px;
    top: ${(props) => props.topPos};
    transition: opacity 0.5s ease-in-out;
  }
`;

TreeHandleBox.displayName = "TreeHandleBox";

TreeHandleBox.defaultProps = {
  visible: false,
  position: Position.Right,
  rightPos: 50,
  leftPos: 50,
};
