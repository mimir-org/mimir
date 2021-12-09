import styled from "styled-components";

interface Props {
  visible: boolean;
}

const RemoveFavoriteBox = styled.div<Props>`
  display: ${(props) => (props.visible ? 'revert' : 'none')};
  margin-left: auto;

  &:hover {
    cursor: pointer;
  }
`;

export default RemoveFavoriteBox;
