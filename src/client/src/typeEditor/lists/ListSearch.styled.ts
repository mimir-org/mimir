import styled from "styled-components";
import { Color } from "../../compLibrary/colors/Color";
import { FontSize, FontType, FontWeight } from "../../compLibrary/font";

export const ListSearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 8px;
  border-width: 0;
  border-bottom-width: 2px;
  border-style: solid;
  border-color: ${Color.BASTILLE};

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }

  input[type="text"] {
    width: 100%;
    height: 12px;
    font-size: ${FontSize.MEDIUM};
    border: 0;
  }

  input[type="text"]::placeholder {
    font-family: ${FontType.STANDARD};
    font-size: ${FontSize.STANDARD};
    font-weight: ${FontWeight.BOLD};
    font-style: italic;
    color: ${Color.BASTILLE};
  }

  .icon {
    margin-left: auto;
    width: 17px;
    height: 17px;
  }
`;
