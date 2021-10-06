import styled from "styled-components";
import { Color, FontSize } from "../../../../../../../../compLibrary";

const MenuListItem = styled.div`
  display: flex;
  height: 27px;
  max-height: 45px;
  align-items: center;
  font-size: ${FontSize.Small};
  color: ${Color.Black};
  background-color: ${Color.White};
  cursor: pointer;

  .label {
    height: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    padding: 10px;
    margin-left: 22px;
  }

  img {
    margin-left: 5px;
    margin-right: 10px;
    height: 14px;
  }

  :hover {
    background-color: ${(props) => props.color};
    p {
      text-decoration: underline;
    }
  }
`;

export default MenuListItem;
