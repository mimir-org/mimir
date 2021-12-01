import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";
import { FontSize } from "../../../../../../compLibrary/font";

const SearchBarBox = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${Color.BlueMagenta};
  margin-bottom: 12px;

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }

  input[type="text"] {
    width: 98%;
    font-size: ${FontSize.SubHeader};
    padding: 2px 4px;
    border: 0px;
  }

  input[type="text"]::placeholder {
    color: ${Color.GreyDarker};
    font-style: italic;
    opacity: 0.5;
  }
`;

export default SearchBarBox;
