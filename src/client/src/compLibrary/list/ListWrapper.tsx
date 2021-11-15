import styled, { css } from "styled-components";
import { Color } from "../colors";
import { FontType, FontSize, FontWeight } from "../font";

interface Props {
  wide?: number;
  height?: number;
  right?: number;
  disabled?: boolean;
  hideOverflow?: boolean;
}

const ListWrapper = styled.div<Props>`
  display: flex;
  flex-direction: column;
  color: ${Color.Black};
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Small};
  font-weight: ${FontWeight.Normal};
  flex: ${(props) => (props.wide === undefined ? 1 : props.wide)};
  margin-right: ${(props) => (props.right === undefined ? 15 : props.right)}px;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  ${(props) =>
    props.hideOverflow &&
    css`
      overflow: hidden;
    `}
`;

export default ListWrapper;
