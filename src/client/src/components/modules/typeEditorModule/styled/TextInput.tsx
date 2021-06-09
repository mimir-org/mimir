import styled from "styled-components";
import { Color, FontSize } from "../../../../componentLibrary";

const TextInput = styled.input`
  border: 1px solid ${Color.DarkerGrey};
  border-radius: 5px;
  padding: 5px;
  width: inherit;
  height: 21px;
  background: ${Color.White};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
`;

export default TextInput;
