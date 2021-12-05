import styled from "styled-components";
import { TERMINALS_COLUMN_HORIZONTAL_PADDING, TERMINALS_COLUMN_WIDTH } from ".";
import { Color } from "../../../../../compLibrary/colors";

const TERMINALS_WIDTH_OFFSET: number = TERMINALS_COLUMN_WIDTH + 2 * TERMINALS_COLUMN_HORIZONTAL_PADDING;

const TerminalsParametersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - ${TERMINALS_WIDTH_OFFSET}px);

  border-left-width: 1px;
  border-left-style: solid;
  border-color: ${Color.GreyDark};
`;

export { TerminalsParametersWrapper };
