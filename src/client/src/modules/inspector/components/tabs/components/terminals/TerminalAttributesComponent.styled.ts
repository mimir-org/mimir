import styled from "styled-components";
import { TERMINALS_COLUMN_HORIZONTAL_PADDING, TERMINALS_COLUMN_WIDTH } from "../shared/styled/TerminalsColumn";
import { Color } from "../../../../../../assets/color/Color";

export const TerminalsBox = styled.div`
  display: flex;
  height: 100%;
`;

const TERMINALS_WIDTH_OFFSET: number = TERMINALS_COLUMN_WIDTH + 2 * TERMINALS_COLUMN_HORIZONTAL_PADDING;
export const TerminalAttributesBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - ${TERMINALS_WIDTH_OFFSET}px);

  border-left-width: 1px;
  border-left-style: solid;
  border-color: ${Color.LIGHT_SILVER};
`;
