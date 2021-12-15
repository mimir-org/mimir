import styled from "styled-components/macro";
import { Color } from "../../../../../../../compLibrary/colors";
import { FontSize } from "../../../../../../../compLibrary/font";

const MenuWrapper = styled.div`
  position: relative;
  margin-top: -46px;
  width: 250px;
  left: 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: ${FontSize.Standard};
  color: ${Color.Black};

  .label {
    margin-bottom: 4px;
  }
`;

export default MenuWrapper;
