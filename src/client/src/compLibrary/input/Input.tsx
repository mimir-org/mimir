import styled from "styled-components";

const Input = styled.input`
  border: 1px solid #898787;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  height: 31px;
  text-align: left;
  margin-right: ${(props) => props.inputType === "tech" && "4px"};
  background-color: ${(props: { readOnly: boolean }) =>
    props.readOnly ? "#f2f2f2" : "#fff"};
  font-size: 13px;
  @media (min-width: 3000px) {
    height: 40px;
    font-size: 16px;
  }
`;

export default Input;
