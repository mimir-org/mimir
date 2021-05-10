import styled from "styled-components";
import { Color, FontSize } from "../../";

const LegendHeader = styled.div`
  font-family: roboto;
  color: ${Color.Black};
  font-size: ${FontSize.Header};
  display: inline-flex;
  align-items: center;
  left: 120px;
  top: 20px;
  margin-bottom: 40px;
  position: relative;
`;

export default LegendHeader;
