import styled from "styled-components";
import { ConnectorTreeViewIcon } from "../../../assets/icons/blockView";

const HandlerWrapper = styled.div`
  .function-treeview-handler {
    visibility: ${(props: { visible: boolean }) => !props.visible && "hidden"};
    width: 14px;
    height: 15px;
    background: url(${ConnectorTreeViewIcon});
    border-radius: 0;
    bottom: -8px;
    top: ${(props: { pos: string }) => props.pos === "top" && "-8px"};
    right: ${(props: { pos: string }) => props.pos === "right" && "-6px"};
    left: ${(props: { pos: string }) => props.pos === "left" && "-6px"};
  }
`;

export default HandlerWrapper;
