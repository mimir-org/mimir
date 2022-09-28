import styled from "styled-components";

interface Props {
  singleColumn: boolean;
}

/**
 * A wrapper for the input field and the drop-down menu for units
 */
export const AttributeInputBox = styled.div<Props>`
  width: ${(props) => (props.singleColumn ? 170 : 250)}px;
  display: flex;
  gap: 4px;
  margin-left: ${(props) => (props.singleColumn ? 30 : 112)}px;
  margin-bottom: 8px;
  height: 20px;

  input {
    max-width: 40%;
    margin-right: 4px;
  }
`;
