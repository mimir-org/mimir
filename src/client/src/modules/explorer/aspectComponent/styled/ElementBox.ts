import styled from "styled-components";
import { UseIndentLevel } from "../../../../helpers";

interface Props {
  indent: number;
}

const ElementBox = styled.div<Props>`
  display: flex;
  input,
  .label {
    margin-left: ${(props) => UseIndentLevel(props.indent)}px;
  }
`;

export default ElementBox;
