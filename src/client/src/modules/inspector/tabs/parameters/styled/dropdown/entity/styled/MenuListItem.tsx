import styled from "styled-components";
import { Color, FontSize } from "../../../../../../../../compLibrary";

const MenuListItem = styled.div`
  display: flex;
  max-height: 31px;
  align-items: center;
  border-bottom: 1.5px solid ${Color.ParamsPurple};
  font-size: ${FontSize.Small};
  color: ${Color.Black};
  background-color: ${Color.White};
  cursor: pointer;

  p {
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
