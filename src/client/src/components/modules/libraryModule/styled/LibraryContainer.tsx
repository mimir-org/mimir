import styled from "styled-components";

const LibraryContainer = styled.div`
  border-left: 1px solid #cbcbcb;
  background: #f2f2f2;
  width: ${(props: { stop: string }) => props.stop}px;
  overflow: hidden;
`;

export default LibraryContainer;
