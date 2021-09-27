import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

const TerminalList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 5px 10px 10px 10px;
  border: 1px solid ${Color.Black};
  border-radius: 5px;

  :first-child {
    border: none;
  }
  :last-child {
    border: 1px solid ${Color.Black};
    border-radius: 5px;
  }
`;
export default TerminalList;
