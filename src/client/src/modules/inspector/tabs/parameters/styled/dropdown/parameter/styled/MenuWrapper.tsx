import styled from "styled-components";
import { Color, FontSize } from "../../../../../../../../compLibrary";

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 10px;
  background-color: ${Color.White};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  position: relative;
  padding-left: 10px;

  .label {
    margin-bottom: 4px;
  }
`;

export default MenuWrapper;
