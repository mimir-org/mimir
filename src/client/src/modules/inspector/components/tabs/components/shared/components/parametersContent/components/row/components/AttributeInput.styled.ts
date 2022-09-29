import styled from "styled-components";

interface Props {
  singleColumn: boolean;
  hasDescriptors: boolean;
}

/**
 * A wrapper for the input field and the drop-down menu for units
 */
export const AttributeInputBox = styled.div<Props>`
  width: ${(props) => (props.singleColumn ? 170 : 250)}px;
  display: flex;
  gap: 4px;
  margin-left: ${(props) => (props.singleColumn ? 47 : 142)}px;
  margin-bottom: ${(props) => (props.hasDescriptors ? 78 : 8)}px;
  height: 20px;

  input {
    width: 35%;
    max-width: 70px;
    margin-right: 4px;
    font-size: 80%;
  }
`;
