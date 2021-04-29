import styled from "styled-components";
import { Color } from "../../../../componentLibrary";

const VisualFilterWrapper = styled.div`
  position: absolute;
  right: 0px;
  background: ${Color.White};
  height: min-content;
  border-style: solid;
  border-color: ${Color.DeepCyan};
  border-width: 0px 2px 2px 2px;
  font-family: roboto;
  padding: 10px;
  z-index: 1102;
  box-shadow: -1px 4px 5px rgba(0, 0, 0, 0.15);
`;

export default VisualFilterWrapper;
