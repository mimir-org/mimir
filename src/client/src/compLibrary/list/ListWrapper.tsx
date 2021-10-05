import styled from "styled-components";
import { Color, FontSize, FontType, FontWeight } from "..";

const ListWrapper = styled.div`
  color: ${Color.Black};
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Normal};
  width: ${(props: { wide: number }) => (props.wide === undefined ? `18%` : props.wide + `%`)};
  height: ${(props: { height: number }) => (props.height === undefined ? `345px` : props.height + `px`)};
  margin-right: ${(props: { right: number }) => (props.right === undefined ? `15px` : props.right)};
  opacity: ${(props: { disabled: boolean }) => (props.disabled ? 0.4 : 1)};
`;

export default ListWrapper;
