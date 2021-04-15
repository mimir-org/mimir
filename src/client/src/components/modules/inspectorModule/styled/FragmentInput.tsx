import styled from "styled-components";

const FragmentInput = styled.input`
  border: 1px solid #898787;
  box-sizing: border-box;
  border-radius: 5px;
  height: 31px;
  width: 183px;
  height: ${(props: { height: string }) =>
    props.height ? props.height : "31"}px;
  width: ${(props: { width: string }) => (props.width ? props.width : "183")}px;
  margin-bottom: 10px;
`;

export default FragmentInput;
