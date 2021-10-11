import styled from "styled-components";
import { Color, FontSize, FontType, FontWeight } from "../";

const ListLabel = styled.div`
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  font-weight: ${FontWeight.Bold};
  color: ${Color.BlueMagenta};
  padding-bottom: 8px;
  border-width: 0;
  border-bottom-width: ${(props: { preview: boolean }) => (props.preview ? 0 : 2)}px;
  border-style: solid;
  border-color: ${Color.BlueMagenta};
`;

export default ListLabel;
