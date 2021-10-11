import styled from "styled-components";

interface Props {
  left?: boolean;
}

const ButtonBox = styled.div<Props>`
  margin-bottom: 30px;
  position: absolute;
  bottom: 0;
  right: ${(props) => !props.left && "30px"};
  left: ${(props) => props.left && "30px"};
`;

export default ButtonBox;
