import styled from "styled-components";
import { Color, FontSize } from "../../../../../../../compLibrary";

const MenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 26px;
  width: 151px;
  background-color: ${Color.ParamsPurple};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: ${FontSize.Medium};
  color: ${Color.White};

  p {
    padding: 10px;
  }

  img {
    margin-right: 4px;
    padding: 5px;
  }
`;

export default MenuHeader;
