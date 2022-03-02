import styled from "styled-components";
import { FontSize, FontType } from "../../../../../compLibrary/font";
import { Color } from "../../../../../compLibrary/colors";

export const SearchAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px 0 20px;
`;

export const SearchFilter = styled.label`
  display: flex;
  flex-direction: row;
  gap: 2px;
`;

export const SearchFilterLabel = styled.span`
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Medium};
  color: ${Color.Black};
  padding: 0 5px 0 2px;
  white-space: nowrap;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const SearchFilters = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 0;
`;
