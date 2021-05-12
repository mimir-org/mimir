import styled from "styled-components";

const Input = styled.input`
  border: 1px solid #898787;
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  width: ${(props: { width: number }) =>
    props.width === 0 ? `90%` : props.width + `px`};
  height: 31px;
`;

export default Input;
