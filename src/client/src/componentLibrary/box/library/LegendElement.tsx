import styled from "styled-components";
import { Color, FontSize } from "../..";

const LegendElement = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 15px;
  background: ${Color.White};
  padding: 6px 10px;
  color: ${Color.Black};
  font-size: ${FontSize.Medium};
  width: auto;

  :nth-child(2) {
    margin-top: 20px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  :last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    margin-bottom: 10px;
  }
`;

export default LegendElement;
