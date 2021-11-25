import styled from "styled-components";
import { Color } from "../../../colors";
import { FontSize } from "../../../font";

const DropdownMenuListItem = styled.div`
  display: flex;
  max-height: 31px;
  align-items: center;
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  border-color: ${Color.GreyDark};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  background-color: ${Color.White};
  cursor: pointer;
  z-index: 1;

  p {
    padding: 10px;
  }

  img {
    margin-left: 5px;
    margin-right: 10px;
    height: 14px;
  }

  :hover {
    background-color: ${Color.BlueLight};
    p {
      text-decoration: underline;
    }
  }
`;

export default DropdownMenuListItem;
