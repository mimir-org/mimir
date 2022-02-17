import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface Props {
  color: string;
}

const LibElementIconWrapper = styled.span<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  height: 25px;
  width: 30px;
  background-color: ${Color.White};
  box-shadow: inset 0 0 0 1px ${Color.Black};
  border: 3px solid ${(props: { color: string }) => props.color};
  border-radius: 5px;
`;

export default LibElementIconWrapper;
