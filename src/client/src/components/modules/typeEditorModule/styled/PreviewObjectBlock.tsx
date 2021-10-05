import styled from "styled-components";
import { Color } from "../../../../compLibrary";

const PreviewObjectBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 65%;
  height: 70%;
  height: ${(props: { blockHeight: number }) => props.blockHeight}%;
  background-color: ${(props: { blockColor: string }) => props.blockColor};
  border: 1px solid ${Color.Black};
  border-radius: 2px;
`;

export default PreviewObjectBlock;
