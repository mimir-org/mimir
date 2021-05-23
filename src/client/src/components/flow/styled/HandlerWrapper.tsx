import styled from "styled-components";
import { FontSize } from "../../../componentLibrary";
import { PlusIcon } from "../../../assets/icons/blockView";

const HandlerWrapper = styled.div`
  .function-treeview-handler {
    visibility: ${(props: { display: string }) =>
      props.display === "false" ? `hidden` : `visible`};
    width: 14px;
    height: 15px;
    background: none;
    background-image: url(${PlusIcon});
    border-radius: 0;
    bottom: -10px;
    top: ${(props: { position: string }) =>
      props.position === "top" ? `-10px` : `auto`};
  }
`;

export default HandlerWrapper;
