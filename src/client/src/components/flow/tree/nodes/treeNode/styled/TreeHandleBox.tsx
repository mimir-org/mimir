import styled from "styled-components";
import { Position } from "react-flow-renderer";
import { ConnectorTreeViewIcon } from "../../../../../../assets/icons/connectors";

interface Props {
  visible: boolean;
  position: Position;
  topPos: string;
}

const TreeHandleBox = styled.div<Props>`
  .function-treeview-handler {
    opacity: ${(props) => (props.visible ? 1 : 0)};
    width: 19px;
    height: 19px;
    background: url(${ConnectorTreeViewIcon});
    border-radius: 0;
    bottom: -18px;
    z-index: 1;
    right: ${(props) => props.position === Position.Right && -6}px;
    left: ${(props) => props.position === Position.Left && -6}px;
    top: ${(props) => props.topPos};
    transition: opacity 0.5s ease-in-out;
  }
`;

export default TreeHandleBox;
