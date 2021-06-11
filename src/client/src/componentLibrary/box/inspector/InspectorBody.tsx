import styled from "styled-components";
import { Color } from "../..";

const InspectorBody = styled.div`
  background-color: ${Color.LightGrey};
  color: ${Color.Black};
  height: 34px;
  border-top: 1px solid ${Color.Grey};
  border-bottom: 1px solid ${Color.Grey};
  width: 100%;
  overflow: hidden;
`;

export default InspectorBody;
