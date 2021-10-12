import styled from "styled-components";
import { Color, FontSize, FontType, FontWeight } from "../";

interface Props {
  preview?: boolean;
}

const ListLabel = styled.div<Props>`
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  font-weight: ${FontWeight.Bold};
  color: ${Color.BlueMagenta};
  padding-bottom: 8px;
  border-width: 0;
  border-bottom-width: ${(props) => (props.preview ? 0 : 2)}px;
  border-style: solid;
  border-color: ${Color.BlueMagenta};
`;

export default ListLabel;
