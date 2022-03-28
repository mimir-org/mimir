import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors/Color";
import { FontSize } from "../../../../../../../compLibrary/font";

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${Color.BASTILLE};
  margin: 20px 0;
`;

export const SearchBarInput = styled.input.attrs(() => ({ type: "text" }))`
  width: 100%;
  font-size: ${FontSize.SUBHEADER};
  padding: 5px;
  border: 0;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${Color.GREY};
    font-style: italic;
    opacity: 0.5;
  }
`;
