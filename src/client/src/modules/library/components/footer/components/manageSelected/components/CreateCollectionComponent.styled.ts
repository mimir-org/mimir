import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors/Color";
import { FontSize, FontType } from "../../../../../../../compLibrary/font";

export const CreateCollectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 0;

  button {
    min-width: 125px;
    white-space: nowrap;
    border-radius: 5px;
    background: ${Color.WHITE};
    border: 1.5px solid ${Color.BASTILLE};
    margin-left: 25px;
    height: 36px;
  }
`;

export const CollectionNameInput = styled.div`
  input[type="text"] {
    border-width: 0 0 1px 0;
    border-radius: 0;
    border-color: ${Color.BASTILLE};
    background: transparent;
    width: 331px;
    height: 36px;
    font-family: ${FontType.STANDARD};
    font-size: ${FontSize.SUBHEADER};
  }

  input[type="text"]::placeholder {
    font-style: italic;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }
`;
