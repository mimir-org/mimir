import styled from "styled-components";
import { Position } from "react-flow-renderer";
import { TreeViewConnectorIcon, TreeViewLocationConnectorIcon, TreeViewProductConnectorIcon } from "assets/icons/connectors";

interface Props {
  hidden: boolean;
  position: Position;
}

export const TreeHandleBox = styled.div<Props>`
  .function-treeview-handler,
  .product-treeview-handler,
  .location-treeview-handler {
    border-radius: 0;
    z-index: 1;
    transition: opacity 0.5s ease-in-out;

    &.partOf {
      opacity: ${(props) => (props.hidden ? 0 : 1)};
      visibility: ${(props) => (props.hidden ? "hidden" : "visible")};
      width: 19px !important;
      height: 19px !important;
      background: url(${TreeViewConnectorIcon});
      right: ${(props) => props.position === Position.Right && 50}px;
      left: ${(props) => props.position === Position.Left && 50}px;
      top: ${(props) => props.position === Position.Top && -20}px;
      bottom: ${(props) => props.position === Position.Bottom && -22}px;
    }

    &.locatedAt {
      width: 16px !important;
      height: 16px !important;
      background: url(${TreeViewLocationConnectorIcon});
      right: ${(props) => props.position === Position.Right && 2}px;
      left: ${(props) => props.position === Position.Left && 2}px;
      top: "50%";
    }

    &.fulfilledBy {
      width: 16px !important;
      height: 16px !important;
      background: url(${TreeViewProductConnectorIcon});
      right: ${(props) => props.position === Position.Right && 2}px;
      left: ${(props) => props.position === Position.Left && 2}px;
      top: "50%";
    }
  }
`;

TreeHandleBox.displayName = "TreeHandleBox";

TreeHandleBox.defaultProps = {
  hidden: false,
  position: Position.Right,
};
