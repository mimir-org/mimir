import styled from "styled-components";

interface Props {
  visible: boolean;
}

const ButtonWrapper = styled.div<Props>`
  visibility: ${(props: { visible: boolean }) => !props.visible && "hidden"};
  display: flex;
  margin-left: auto;
  justify-content: space-evenly;
  position: relative;
`;

export default ButtonWrapper;
