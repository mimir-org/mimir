import styled from "styled-components";
import { Color } from "../../../";

const DropdownMenuList = styled.div`
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-color: ${Color.Black};
  border-radius: ${(props: { borderRadius: number }) => props.borderRadius};
  background-color: inherit;
  position: absolute;
  top: 38px;
  left: 0;
  z-index: 1;
  width: 100%;
  max-height: 250px;
  overflow-y: auto;
`;

export default DropdownMenuList;
