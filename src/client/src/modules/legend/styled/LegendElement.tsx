import styled from "styled-components";
import { Color, FontSize } from "../../../compLibrary";

const LegendElement = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 5px 0px 15px;
  background: ${Color.White};
  padding: 0px 10px;
  color: ${Color.Black};
  font-size: ${FontSize.Medium};
  width: auto;

  :first-child {
    padding-top: 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  :last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-bottom: 10px;
    width: initial;
  }
`;

export default LegendElement;
