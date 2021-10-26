import styled from "styled-components";
import FontSize from "../font/FontSize";
import Color from "../colors/Color";
import FontType from "../font/FontType";
import FontWeight from "../font/FontWeight";

const ListSearchBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 8px;
  border-width: 0;
  border-bottom-width: 2px;
  border-style: solid;
  border-color: ${Color.BlueMagenta};
  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }
  input[type="text"] {
    width: 100%;
    height: 12px;
    font-size: ${FontSize.Medium};
    border: 0px;
  }
  input[type="text"]::placeholder {
    font-family: ${FontType.Standard};
    font-size: ${FontSize.Standard};
    font-weight: ${FontWeight.Bold};
    font-style: italic;
    color: ${Color.BlueMagenta};
  }
  .icon {
    margin-left: auto;
    width: 17px;
    height: 17px;
  }
`;

export default ListSearchBar;