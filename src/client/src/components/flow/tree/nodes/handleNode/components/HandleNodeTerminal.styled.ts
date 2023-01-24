import styled from "styled-components";

export const HandleNodeTerminalBox = styled.div`
  .function-treeview-handler {
    opacity: 0;
    visibility: hidden;
    border-radius: 0;
    z-index: -10;
    transition: opacity 0.5s ease-in-out;
    width: 0px;
    height: 0px;
    top: 25%;
  }
`;

HandleNodeTerminalBox.displayName = "HandleNodeTerminalBox";
