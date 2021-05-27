import styled from "styled-components";

const Textarea = styled.textarea`
  border: 1px solid #898787;
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 5px;
  width: ${(props: { width: number }) =>
    props.width === 0 ? `90%` : props.width + `px`};
  height: ${(props: { height: number }) =>
    props.height === 0 ? `90%` : props.height + `px`};
  background-color: ${(props: { readOnly: boolean }) =>
    props.readOnly ? "#f2f2f2" : "#fff"};
`;

export default Textarea;
