import styled from "styled-components";
import { Color, FontSize, FontType } from "..";

const DropdownMenuListItem = styled.div`
  display: flex;
  width: 184px;
  height: 31px;
  align-items: center;
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  border-color: ${Color.Grey};
  border-radius: 0px;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  background-color: ${Color.White};
  cursor: pointer;

  p {
    padding: 5px;
  }

  :hover {
    background-color: rgba(0, 112, 121, 0.1);
  }
`;

export default DropdownMenuListItem;
