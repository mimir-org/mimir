import styled from "styled-components";
import { Color, FontSize, FontType, FontWeight } from "..";

const ListWrapper = styled.div`
  z-index: 0;
  color: ${Color.Black};
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Medium};
  font-weight: ${FontWeight.Normal};
  flex: ${(props: { flex: number }) =>
    props.flex === undefined ? `1` : props.flex};
  height: ${(props: { height: number }) =>
    props.height === undefined ? `250px` : props.height + `px`};
  margin-right: ${(props: { right: number }) =>
    props.right === undefined ? `15px` : props.right};

  .text {
    font-style: italic;
    text-align: center;
  }
`;

export default ListWrapper;
