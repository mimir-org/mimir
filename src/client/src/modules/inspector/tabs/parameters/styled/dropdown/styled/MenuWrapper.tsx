import styled from "styled-components";
import { Color, FontSize } from "../../../../../../../compLibrary";

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 61px;
  left: 15px;
  height: 26px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${Color.White};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};

  .label {
    margin-bottom: 4px;
  }
`;

export default MenuWrapper;
