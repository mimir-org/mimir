import styled from "styled-components";
import { FontSize, FontWeight } from "../../../../compLibrary/font";

interface Props {
  isHeader: boolean;
  isSubHeader: boolean;
}

const ElementLabel = styled.span<Props>`
  position: relative;
  bottom: 0.5px;
  font-size: ${FontSize.Standard};
  font-weight: ${(props) => (props.isHeader || props.isSubHeader) && FontWeight.Bold};
  width: 220px;
`;

export default ElementLabel;
