import styled from "styled-components";
import { FontWeight } from "../..";

const ButtonBox = styled.div`
  display: inline;
  position: absolute;
  right: 0px;
  margin-top: 10px;
  margin-right: 10px;

  :hover {
    cursor: pointer;
    font-weight: ${FontWeight.Bold};
  }
`;

export default ButtonBox;
