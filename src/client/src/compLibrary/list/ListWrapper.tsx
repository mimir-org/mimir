import styled from "styled-components";
import { Color, FontSize, FontType, FontWeight } from "..";

const ListWrapper = styled.div`
  color: ${Color.Black};
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Normal};
  flex: ${(props: { wide: number }) => (props.wide === undefined ? 1 : props.wide)};
  height: ${(props: { height: number }) => (props.height === undefined ? 523 : props.height)}px;
  margin-right: ${(props: { right: number }) => (props.right === undefined ? 15 : props.right)}px;
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.4 : 1)};
`;

export default ListWrapper;
