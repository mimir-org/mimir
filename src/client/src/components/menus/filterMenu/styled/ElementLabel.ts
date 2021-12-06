import styled from "styled-components";
import { FontSize, FontWeight } from "../../../../compLibrary/font";

interface Props {
  isHeader: boolean;
  isSubHeader: boolean;
}

const ElementLabel = styled.div<Props>`
  position: relative;
  margin-left: 30px;
  bottom: 0.5px;
  font-size: ${FontSize.Standard};
  font-weight: ${(props) => (props.isHeader || props.isSubHeader) && FontWeight.Bold};
  width: 220px;
`;

export default ElementLabel;
