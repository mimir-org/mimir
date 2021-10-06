import styled from "styled-components";
import { Color, FontSize } from "../../../../../../../../compLibrary";

const MenuWrapper = styled.div`
  position: relative;
  margin-top: -46px;
  width: 150px;
  left: 20px;
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
