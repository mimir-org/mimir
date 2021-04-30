import styled from "styled-components";
import { Color } from "../../../../componentLibrary";

const LibraryContainer = styled.div`
  border-left: 1px solid ${Color.Grey};
  background: ${Color.LightGrey};
  width: ${(props: { stop: string }) => props.stop}px;
  overflow: hidden;
`;

export default LibraryContainer;
