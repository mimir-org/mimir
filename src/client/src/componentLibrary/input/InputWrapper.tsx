import styled from "styled-components";

const InputWrapper = styled.div`
  float: left;
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
  }
`;

export default InputWrapper;
