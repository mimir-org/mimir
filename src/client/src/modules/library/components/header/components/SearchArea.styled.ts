import styled from "styled-components";
import { FontSize, FontType } from "../../../../../assets/font";
import { Color } from "../../../../../assets/color/Color";

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
  font-family: ${FontType.STANDARD};
  font-size: ${FontSize.MEDIUM};
  color: ${Color.BLACK};
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
