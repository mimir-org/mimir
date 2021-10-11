import styled from "styled-components";
import { Color } from "../../../../compLibrary";

interface Props {
  blockHeight: number;
  blockColor: string;
}

const PreviewObjectBlock = styled.div<Props>`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 65%;
  height: 65%;
  height: ${(props) => props.blockHeight}%;
  background-color: ${(props) => props.blockColor};
  border: 1px solid ${Color.Black};
  border-radius: 2px;
`;

export default PreviewObjectBlock;
