import styled from "styled-components";

interface Props {
  width: number;
  rightMargin?: string;
}

const InputWrapper = styled.div<Props>`
  width: ${(props) => `${props.width}%`};
  margin-right: ${(props) => props.rightMargin || 0};
  white-space: nowrap;
`;

export default InputWrapper;
