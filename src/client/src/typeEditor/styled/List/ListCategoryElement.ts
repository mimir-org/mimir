import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontWeight } from "../../../compLibrary/font";

const ListCategoryElement = styled.div`
  border-top: 1px solid ${Color.BLUE_MAGENTA};
  border-bottom: 1px solid ${Color.BLUE_MAGENTA};
  background-color: ${Color.WHITE} !important;

  p {
    margin: 0px 7px;
    height: 30px;
    line-height: 30px;
    font-weight: ${FontWeight.BOLD};
    text-transform: uppercase;
  }
`;

export default ListCategoryElement;
