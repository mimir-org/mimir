import styled from "styled-components";
import { GetPropertiesHeight } from "../../helpers/GetPropertiesHeight";
interface Props {
  wide?: number;
}

const TypePreviewColumn = styled.div<Props>`
  display: flex;
  flex: ${(props) => (props.wide === undefined ? 1 : props.wide)};
  flex-direction: column;
  max-height: ${GetPropertiesHeight(false)}px;
`;

export default TypePreviewColumn;
