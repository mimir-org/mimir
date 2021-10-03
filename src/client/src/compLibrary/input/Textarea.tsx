import styled from "styled-components";
import Color from "../colors/Color";

const Textarea = styled.textarea`
  border: 1px solid ${Color.DarkerGrey};
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  height: ${(props: { height: number }) => props.height}px;
  background-color: ${(props: { readOnly: boolean }) => (props.readOnly ? Color.Grey : Color.White)};
  font-family: inherit;
  font-size: 14px;
`;

export default Textarea;
