import styled from "styled-components";
import { FontSize, FontType, Color } from "../../../../componentLibrary";

const ExplorerContainer = styled.div`
  border-right: 1px solid ${Color.Grey};
  background: ${Color.White};
  width: ${(props: { stop: string }) => props.stop}px;
  height: inherit;
  overflow: hidden;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
`;

export default ExplorerContainer;
