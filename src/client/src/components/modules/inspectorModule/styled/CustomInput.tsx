import styled from "styled-components";

const CustomInput = styled.input`
  border: 1px solid #898787;
  box-sizing: border-box;
  border-radius: 5px;
  height: 88px;
  width: ${(props: { width: string }) => props.width}px;
  margin-bottom: 10px;
`;

export default CustomInput;
