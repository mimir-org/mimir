import styled from "styled-components";
import { FontWeight } from "../../../../componentLibrary";

const ButtonBox = styled.div`
  display: inline;
  margin-top: 8px;
  margin-right: 10px;
  float: right;

  :hover {
    cursor: pointer;
    font-weight: ${FontWeight.Bold};
  }
`;

export default ButtonBox;
