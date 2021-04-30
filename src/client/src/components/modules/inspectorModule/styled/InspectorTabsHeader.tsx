import styled from "styled-components";
import { Color, FontType } from "../../../../componentLibrary";

const InspectorTabsHeader = styled.div`
  background-color: ${Color.LightGrey};
  color: ${Color.Black};
  height: 35px;
  border-top: 1px solid ${Color.Grey};
  border-bottom: 1px solid ${Color.Grey};
  font-family: ${FontType.Standard};
  width: 100%;
`;

export default InspectorTabsHeader;
