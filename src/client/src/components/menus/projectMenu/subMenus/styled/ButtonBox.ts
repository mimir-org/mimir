import styled from "styled-components";

interface Props {
  left?: boolean;
  large?: boolean;
  disabled?: boolean;
}

const ButtonBox = styled.div<Props>`
  position: absolute;
  bottom: ${(props) => (props.large ? 20 : 8)}px;
  right: ${(props) => !props.left && "30px"};
  left: ${(props) => props.left && "30px"};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export default ButtonBox;
