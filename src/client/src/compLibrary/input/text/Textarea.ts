import styled from "styled-components";
import { Color } from "../../colors";
import { FontSize } from "../../font";

interface Props {
  height: number;
  readOnly?: boolean;
}

const Textarea = styled.textarea<Props>`
  border: 1px solid ${Color.GREY_DARKER};
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  height: ${(props) => props.height}px;
  background-color: ${(props) => (props.readOnly ? Color.GREY : Color.WHITE)};
  font-family: inherit;
  font-size: ${FontSize.Standard};
`;

export default Textarea;
