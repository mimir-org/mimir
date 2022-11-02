import styled from "styled-components";

interface Props {
  singleColumn: boolean;
  hasDescriptors: boolean;
}

/**
 * A wrapper for the input field and the drop-down menu for units
 */
export const AttributeInputBox = styled.div<Props>`
  width: ${(props) => (props.singleColumn ? 100 : 100)}%;
  display: flex;
  gap: 4px;
  margin-left: ${(props) => (props.singleColumn ? 47 : 140)}px;
  margin-bottom: ${(props) => (props.hasDescriptors ? 11 : 78)}px;
  height: 20px;

  input {
    width: 35%;
    max-width: 70px;
    margin-right: 5px;
    font-size: 80%;
  }
`;
