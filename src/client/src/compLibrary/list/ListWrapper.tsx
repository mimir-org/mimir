import styled from "styled-components";
import { Color, FontSize, FontType, FontWeight } from "..";

interface Props {
  wide?: number;
  height?: number;
  right?: number;
  disabled?: boolean;
}

const ListWrapper = styled.div<Props>`
  color: ${Color.Black};
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Normal};
  flex: ${(props) => (props.wide === undefined ? 1 : props.wide)};
  height: ${(props) => (props.height === undefined ? 523 : props.height)}px;
  margin-right: ${(props) => (props.right === undefined ? 15 : props.right)}px;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
`;

export default ListWrapper;
