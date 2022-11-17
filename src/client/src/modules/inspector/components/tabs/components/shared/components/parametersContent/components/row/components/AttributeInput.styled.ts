import styled from "styled-components";
import { FontSize } from "../../../../../../../../../../../assets/font";

/**
 * A wrapper for the input field and the drop-down menu for units
 */
export const AttributeInputBox = styled.div`
  margin: 5px 0 5px auto;
  width: 60%;
  display: flex;
  flex-direction: column;
  font-size: ${FontSize.TINY};

  input {
    width: 100%;
    border: solid 1px black;
    border-radius: 5px;
    height: 20px;
    padding: 10px;
    text-align: right;
  }
`;

export const AttributeUnitBox = styled.div`
  margin: 5px auto 5px 0;
  width: 60%;
  display: flex;
  flex-direction: column;
  font-size: ${FontSize.TINY};
`;
