import styled from "styled-components";

const LibraryContainer = styled.div`
  border-left: 2px solid black;
  background: #f2f2f2;
  width: ${(props: { stop: string }) => props.stop}px;
  overflow: hidden;
`;

export default LibraryContainer;
