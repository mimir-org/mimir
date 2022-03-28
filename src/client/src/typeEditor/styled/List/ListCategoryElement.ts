import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";
import { FontWeight } from "../../../compLibrary/font";

const ListCategoryElement = styled.div`
  border-top: 1px solid ${Color.BASTILLE};
  border-bottom: 1px solid ${Color.BASTILLE};
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
