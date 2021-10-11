import styled from "styled-components";
import { Position } from "react-flow-renderer";
import { ConnectorTreeViewIcon } from "../../../../../assets/icons/connectors";

interface Props {
  visible: boolean;
  position: Position;
  input?: number;
  output?: number;
}

const TreeHandleBox = styled.div<Props>`
  .function-treeview-handler {
    visibility: ${(props: { visible: boolean }) => !props.visible && "hidden"};
    width: 14px;
    height: 15px;
    background: url(${ConnectorTreeViewIcon});
    border-radius: 0;
    bottom: -8px;
    z-index: 1;
    right: ${(props: { position: Position }) => props.position === Position.Right && -6}px;
    left: ${(props: { position: Position }) => props.position === Position.Left && -6}px;

    top: ${(props) =>
      props.position === Position.Left
        ? props.input + "%"
        : props.position === Position.Right
        ? props.output + "%"
        : props.position === Position.Top && "-15px"};
  }
`;

export default TreeHandleBox;
