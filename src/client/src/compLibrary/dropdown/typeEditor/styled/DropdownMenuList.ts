import styled from "styled-components";
import { Color } from "../../../colors";

const DropdownMenuList = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-color: ${Color.Black};
  border-radius: 5px;
  background-color: inherit;
  position: absolute;
  top: 50px;
  left: 0;
  z-index: 1;
  width: 99%;
  max-height: 250px;
  overflow-y: auto;

  .listitem {
    background-color: white;
    display: flex;
    flex-direction: column;
  }
`;

export default DropdownMenuList;
