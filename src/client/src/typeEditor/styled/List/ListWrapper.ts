import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";
import { FontSize, FontType, FontWeight } from "../../../compLibrary/font";

interface Props {
  flex?: string | number;
  height?: string;
  minHeight?: string;
  disabled?: boolean;
  hideOverflow?: boolean;
}

const ListWrapper = styled.div<Props>`
  display: flex;
  flex-direction: column;
  flex: ${(props) => (props.flex === undefined ? 1 : props.flex)};
  color: ${Color.BLACK};
  font-family: ${FontType.STANDARD};
  font-size: ${FontSize.SMALL};
  font-weight: ${FontWeight.NORMAL};
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
  height: ${(props) => (props.height === undefined ? "auto" : props.height)};
  min-height: ${(props) => (props.minHeight === undefined ? "auto" : props.minHeight)};
  overflow: ${(props) => (props.hideOverflow ? "hidden" : "revert")};
`;

export default ListWrapper;
