import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";
import { FontSize } from "../../../../../compLibrary/font";

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 15px;
  background-color: ${Color.White};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  position: relative;
  padding-left: 10px;
  width: 250px;

  .label {
    margin-bottom: 4px;
  }
`;

export default MenuWrapper;
