import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";
import { FontSize, FontType, FontWeight } from "../../../compLibrary/font";

interface Props {
  removeBorderBottom?: boolean;
  preview?: boolean;
}

const ListLabel = styled.div<Props>`
  font-family: ${FontType.STANDARD};
  font-size: ${FontSize.STANDARD};
  font-weight: ${FontWeight.BOLD};
  color: ${Color.BASTILLE};
  padding-bottom: ${(props) => (props.removeBorderBottom ? 0 : 8)}px;
  border-width: 0;
  border-bottom-width: ${(props) => (props.removeBorderBottom || props.preview ? 0 : 2)}px;
  border-style: solid;
  border-color: ${Color.BASTILLE};
`;

export default ListLabel;
