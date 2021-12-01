import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";

const SearchBarBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${Color.BlueMagenta};
  margin: 7px 0px;

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }

  input[type="text"] {
    width: 95%;
    height: 28px;
    font-size: 14px;
    padding: 2px 8px;
    border: 0px;
  }

  input[type="text"]::placeholder {
    color: ${Color.GreyDarker};
    font-style: italic;
    opacity: 0.5;
  }
`;

export default SearchBarBox;
