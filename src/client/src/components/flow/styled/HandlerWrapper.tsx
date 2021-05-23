import styled from "styled-components";
import { FontSize } from "../../../componentLibrary";

const HandlerWrapper = styled.div`
  .function-treeview-handler {
    visibility: ${(props: { display: string }) =>
      props.display === "false" ? `hidden` : `visible`};
    /* width: 10px;
    height: 10px;
    background: #fff; */
  }
`;

export default HandlerWrapper;
