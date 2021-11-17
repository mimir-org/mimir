import styled from "styled-components";

interface Props {
  visible: boolean;
}

const RemoveFavoriteBox = styled.div<Props>`
  opacity: ${(props) => (props.visible ? 1 : 0)};
  position: absolute;
  right: 58px;

  &:hover {
    cursor: pointer;
  }
`;

export default RemoveFavoriteBox;
