import styled from "styled-components";
import { Color } from "../../../../../../../../compLibrary/colors";
import { FontSize } from "../../../../../../../../compLibrary/font";

const MenuListItem = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
  height: 30px;
  border-width: 1px 0 1px 0;
  border-style: solid;
  border-color: ${Color.GreyDark};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  background-color: ${Color.White};
  cursor: pointer;
  z-index: 1;

  :hover {
    background-color: ${Color.BlueLight};
    span {
      text-decoration: underline;
    }
  }
`;

export default MenuListItem;
