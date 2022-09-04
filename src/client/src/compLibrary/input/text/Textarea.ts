import styled from "styled-components";
import { Color } from "../../../assets/color/Color";
import { FontSize } from "../../../assets/font";

interface Props {
  height: number;
  readOnly?: boolean;
}

const Textarea = styled.textarea<Props>`
  border: 1px solid ${Color.GREY};
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  height: ${(props) => props.height}px;
  background-color: ${(props) => (props.readOnly ? Color.GAINSBORO : Color.WHITE)};
  font-family: inherit;
  font-size: ${FontSize.STANDARD};
`;

export default Textarea;
