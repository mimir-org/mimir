import styled from "styled-components";
import { Color, FontWeight } from "../../../compLibrary";

const ListCategoryElement = styled.div`
  border-top: 1px solid ${Color.BlueMagenta};
  border-bottom: 1px solid ${Color.BlueMagenta};
  background-color: ${Color.White} !important;

  p {
    margin: 0px 7px;
    height: 30px;
    line-height: 30px;
    font-weight: ${FontWeight.Bold};
    text-transform: uppercase;
  }
`;

export default ListCategoryElement;
