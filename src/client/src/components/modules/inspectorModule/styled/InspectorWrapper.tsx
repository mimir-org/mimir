import styled from "styled-components";
import { Color } from "../../../../componentLibrary";

const InspectorWrapper = styled.div`
  border: 0px solid ${Color.Black};
  height: ${(props: { stop: string }) => props.stop};
  background-color: ${Color.LightGrey};
  width: 100%;
  z-index: 5;
  overflow: hidden;
  position: relative;
`;

export default InspectorWrapper;
