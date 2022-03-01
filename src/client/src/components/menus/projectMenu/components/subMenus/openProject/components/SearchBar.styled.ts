import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors";
import { FontSize } from "../../../../../../../compLibrary/font";

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${Color.BlueMagenta};
  margin: 20px 0;
`;

export const SearchBarInput = styled.input.attrs(() => ({ type: "text" }))`
  width: 100%;
  font-size: ${FontSize.SubHeader};
  padding: 5px;
  border: 0;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${Color.GreyDarker};
    font-style: italic;
    opacity: 0.5;
  }
`;
