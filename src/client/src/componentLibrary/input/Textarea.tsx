import styled from "styled-components";

const Textarea = styled.textarea`
  border: 1px solid #898787;
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
  height: 100px;
  background-color: ${(props: { readOnly: boolean }) =>
    props.readOnly ? "#f2f2f2" : "#fff"};
`;

export default Textarea;
