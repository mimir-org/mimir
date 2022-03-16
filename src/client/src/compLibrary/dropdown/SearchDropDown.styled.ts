import styled from "styled-components";
import { Color } from "../colors/Color";
import { FontSize } from "../font";

export const SearchBarContainer = styled.div`
  flex: 1;
  position: relative;
  height: 20px;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  border: 1px solid ${Color.BASTILLE};
  border-radius: 5px;
  background-color: ${Color.WHITE} !important;
  padding: 0 5px 0 10px;
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
    color: ${Color.GREY};
    font-size: ${FontSize.MEDIUM};
    font-style: italic;
    opacity: 0.5;
  }

  .icon {
    width: 10px;
    height: 6px;
  }
`;

export const SearchBarList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Color.WHITE};
  border: 1px solid ${Color.BASTILLE};
  border-radius: 5px;
  padding: 1px;
  font-size: 11px;
  position: absolute;
  top: 23px;
  left: 0;
  width: 100%;
  z-index: 1;
`;

export const SearchBarListItem = styled.div`
  height: 18px;
  border-bottom: 1px solid ${Color.LIGHT_SILVER};
  background-color: ${Color.WHITE};

  p {
    padding: 3px 13px;
  }

  &:hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
    text-decoration: underline;
    cursor: pointer;
  }
`;
