import styled from "styled-components";
import { Color } from "../colors";
import { FontSize } from "../font";

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  border: 1px solid ${Color.BlueMagenta};
  border-radius: 5px;
  padding: 1px;
  background-color: ${Color.White} !important;

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }

  input[type="text"] {
    padding: 2.5px 13px;
    width: 100%;
    height: 12px;
    font-size: ${FontSize.Medium};
    border: 0px;
  }

  input[type="text"]::placeholder {
    color: ${Color.DarkerGrey};
    font-size: ${FontSize.Medium};
    font-style: italic;
    opacity: 0.5;
  }

  .icon {
    padding: 0px 5px;
    margin-left: auto;
    width: 10px;
    height: 6px;
  }
`;

export default SearchBar;
