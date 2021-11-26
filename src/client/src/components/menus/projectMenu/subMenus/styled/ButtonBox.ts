import styled from "styled-components";

interface Props {
  left?: boolean;
}

const ButtonBox = styled.div<Props>`
  position: absolute;
  bottom: 8px;
  right: ${(props) => !props.left && "30px"};
  left: ${(props) => props.left && "30px"};
`;

export default ButtonBox;
