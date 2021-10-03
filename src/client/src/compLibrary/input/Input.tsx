import styled from "styled-components";
import Color from "../colors/Color";

const Input = styled.input`
  border: 1px solid ${Color.White};
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  height: 31px;
  text-align: left;
  margin-right: ${(props) => props.inputType === "tech" && "4px"};
  background-color: ${(props: { readOnly: boolean }) =>
    props.readOnly ? Color.Grey : Color.White};
  font-size: ${(props) => GetFontSize(props.fontSize)}px;

  @media (min-width: 3000px) {
    height: 40px;
    font-size: 16px;
  }
`;

const GetFontSize = (fontSize: number) => fontSize ?? 13;
export default Input;
