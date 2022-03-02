import styled from "styled-components";
import { Color } from "../colors";
import { FontSize, FontType, FontWeight } from "../font";

interface Props {
  removeBorderBottom?: boolean;
  preview?: boolean;
}

const ListLabel = styled.div<Props>`
  font-family: ${FontType.Standard};
  font-size: ${FontSize.STANDARD};
  font-weight: ${FontWeight.Bold};
  color: ${Color.BLUE_MAGENTA};
  padding-bottom: ${(props) => (props.removeBorderBottom ? 0 : 8)}px;
  border-width: 0;
  border-bottom-width: ${(props) => (props.removeBorderBottom || props.preview ? 0 : 2)}px;
  border-style: solid;
  border-color: ${Color.BLUE_MAGENTA};
`;

export default ListLabel;
