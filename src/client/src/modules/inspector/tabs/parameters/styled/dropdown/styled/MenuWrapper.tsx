import styled from "styled-components";
import { Color, FontSize } from "../../../../../../../compLibrary";

const MenuWrapper = styled.div`
  position: absolute;
  margin-top: -40px;
  left: 13px;
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
