import styled from "styled-components";

export const TERMINALS_COLUMN_WIDTH: number = 440;
export const TERMINALS_COLUMN_HORIZONTAL_PADDING: number = 20;

export const TerminalsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: ${TERMINALS_COLUMN_HORIZONTAL_PADDING}px;
  width: ${TERMINALS_COLUMN_WIDTH}px;
  height: 100%;
`;
