import styled from "styled-components";
import { Color, FontSize } from "../../../../../compLibrary";

const TerminalHeader = styled.div`
  display: flex;
  height: 16px;
  margin: 15px 0px 0px 20px;
  color: ${Color.GreyHeader};
  font-size: ${FontSize.Medium};
`;

export default TerminalHeader;
