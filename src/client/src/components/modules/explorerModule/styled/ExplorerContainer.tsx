import styled from "styled-components";

const ExplorerContainer = styled.div`
  border-right: 1px solid #cbcbcb;
  background: #f2f2f2;
  width: ${(props: { stop: string }) => props.stop}px;
  height: inherit;
  overflow: hidden;
  font-family: roboto;
  font-size: 18px;
`;

export default ExplorerContainer;
