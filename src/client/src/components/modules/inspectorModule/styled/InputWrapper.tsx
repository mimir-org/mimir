import styled from "styled-components";

const InputWrapper = styled.div`
  width: ${(props) => props.width};
  margin-right: ${(props) => props.rightMargin || 0};
`;

export default InputWrapper;
