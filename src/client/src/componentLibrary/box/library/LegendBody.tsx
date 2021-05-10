import styled from "styled-components";
import { Color } from "../../";

const LegendBody = styled.div`
  width: inherit;
  height: 600px;
  bottom: 0;
  position: absolute;
  border-top: 1px solid ${Color.Grey};
  overflow: hidden;
`;

export default LegendBody;
