import styled from "styled-components";
import { Position } from "react-flow-renderer";
import {
  TreeViewConnectorIcon,
  TreeViewLocationConnectorIcon,
  TreeViewProductConnectorIcon,
} from "../../../../../assets/icons/connectors";

interface Props {
  visible: boolean;
  position: Position;
  topPos: string;
  isFunctionAspect: boolean;
}

export const TreeHandleBox = styled.div<Props>`
  .function-treeview-handler {
    border-radius: 0;
    bottom: -19px;
    z-index: 1;
    transition: opacity 0.5s ease-in-out;

    &.partOf {
      opacity: ${(props) => (props.visible ? 1 : 0)};
      visibility: ${(props) => (props.visible ? "visible" : "hidden")};
      width: 19px !important;
      height: 19px !important;
      background: url(${TreeViewConnectorIcon});
      right: ${(props) => props.position === Position.Right && 50}px;
      left: ${(props) => props.position === Position.Left && 50}px;
      top: ${(props) => props.topPos};
    }

    &.locatedAt {
      width: 16px !important;
      height: 16px !important;
      background: url(${TreeViewLocationConnectorIcon});
      right: ${(props) => props.position === Position.Right && 4}px;
      left: ${(props) => props.position === Position.Left && 4}px;
      top: ${(props) => (props.isFunctionAspect ? "60%" : "50%")};
    }

    &.fulfilledBy {
      width: 16px !important;
      height: 16px !important;
      background: url(${TreeViewProductConnectorIcon});
      right: ${(props) => props.position === Position.Right && 4}px;
      left: ${(props) => props.position === Position.Left && 4}px;
      top: ${(props) => (props.isFunctionAspect ? "40%" : "50%")};
      &:hover {
        background-color: black;
      }
    }
  }
`;

TreeHandleBox.displayName = "TreeHandleBox";

TreeHandleBox.defaultProps = {
  visible: false,
  position: Position.Right,
};
