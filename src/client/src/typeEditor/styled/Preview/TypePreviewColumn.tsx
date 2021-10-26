import styled from "styled-components";
import { Size } from "../../../compLibrary";
interface Props {
  wide?: number;
}

const TypePreviewColumn = styled.div<Props>`
  display: flex;
  flex: ${(props) => (props.wide === undefined ? 1 : props.wide)};
  flex-direction: column;
  max-height: ${Size.TypeEditorPropertiesShrunk}px;
`;

export default TypePreviewColumn;
