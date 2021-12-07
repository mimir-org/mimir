import styled from "styled-components";
import { Color } from "../../../../../../../../compLibrary/colors";
import { FontSize } from "../../../../../../../../compLibrary/font";

const MenuWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: ${Color.White};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};

  .label {
    margin-bottom: 4px;
  }
`;

export default MenuWrapper;
