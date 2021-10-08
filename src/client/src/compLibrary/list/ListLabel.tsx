import styled from "styled-components";
import { Color, FontSize, FontType, FontWeight } from "../";

const ListLabel = styled.div`
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  font-weight: ${FontWeight.Bold};
  color: ${Color.BlueMagenta};
  padding-bottom: 8px;
  border-width: 0px 0px 2px 0px;
  border-style: solid;
  border-color: ${Color.BlueMagenta};
`;

export default ListLabel;
