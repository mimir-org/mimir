import styled from "styled-components";
import { Color, FontSize, FontType, FontWeight } from "..";

const ListWrapper = styled.div`
  z-index: 0;
  color: ${Color.Black};
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Medium};
  font-weight: ${FontWeight.Normal};
  width: ${(props: { width: number }) =>
    props.width === undefined ? `124px` : props.width + `px`};
  height: ${(props: { width: number }) =>
    props.width === undefined ? `250px` : props.width + `px`};
`;

export default ListWrapper;
