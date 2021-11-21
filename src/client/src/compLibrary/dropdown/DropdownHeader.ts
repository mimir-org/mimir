import styled from "styled-components";
import { Color } from "../colors";

const DropdownHeader = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: row;
  width: 63px;
  border: 1px solid ${Color.BlueMagenta};
  border-radius: 5px;
  padding: 1px;
  font-size: 11px;
  background-color: ${Color.White} !important;

  p {
    padding: 2px 5px;
  }

  .icon {
    padding: 0px 5px;
    margin-left: auto;
    width: 10px;
    height: 6px;
  }
`;

export default DropdownHeader;
