import styled from "styled-components";

const Input = styled.input`
  border: 1px solid #898787;
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  height: 31px;
  width: ${(props) => props.width + "px" ?? "100%"};
  background-color: ${(props: { readOnly: boolean }) =>
    props.readOnly ? "#f2f2f2" : "#fff"};
`;

export default Input;
