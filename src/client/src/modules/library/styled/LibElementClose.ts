import styled from "styled-components";

interface Props {
  visible: boolean;
}

const LibElementClose = styled.div<Props>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  position: absolute;
  right: 45px;

  &:hover {
    cursor: pointer;
  }
`;

export default LibElementClose;
