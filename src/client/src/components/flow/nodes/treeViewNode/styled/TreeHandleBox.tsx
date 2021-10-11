import styled from "styled-components";
import { Position } from "react-flow-renderer";
import { ConnectorTreeViewIcon } from "../../../../../assets/icons/blockView";

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
    top: ${(props) =>
      props.position === Position.Left
        ? `${props.input}%`
        : props.position === Position.Right
        ? `${props.output}%`
        : props.position === Position.Top && "-8px"};

    right: ${(props) => props.position === Position.Right && -6}px;
    left: ${(props) => props.position === Position.Left && -6}px;
  }
`;

export default TreeHandleBox;
