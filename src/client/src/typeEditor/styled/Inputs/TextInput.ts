import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";
import { FontSize } from "../../../compLibrary/font";

const TextInput = styled.input`
  border: 1.5px solid ${Color.BLACK};
  border-radius: 5px;
  background: ${Color.WHITE};
  font-size: ${FontSize.STANDARD};
  color: ${Color.BLACK};
`;

export default TextInput;
