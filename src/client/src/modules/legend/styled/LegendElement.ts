import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize } from "../../../compLibrary/font";

const LegendElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${Color.White};
  padding: 10px;
  color: ${Color.Black};
  font-size: ${FontSize.Medium};
  width: auto;

  :first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  
  :last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    width: initial;
  }
`;

export default LegendElement;
