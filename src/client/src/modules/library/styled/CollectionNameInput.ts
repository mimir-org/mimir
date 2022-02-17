import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontType } from "../../../compLibrary/font";

const CollectionNameInput = styled.div`
  input[type="text"] {
    border-width: 0px 0px 1px 0px;
    border-radius: 0px;
    border-color: ${Color.BlueMagenta};
    background: transparent;
    width: 331px;
    height: 36px;
    font-family: ${FontType.Standard};
    font-size: ${FontSize.SubHeader};
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

export default CollectionNameInput;
