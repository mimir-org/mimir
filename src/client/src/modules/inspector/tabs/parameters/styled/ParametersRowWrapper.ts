import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

const ParametersRowWrapper = styled.div`
  display: flex;
  flex-direction: column;

  border-color: ${Color.DarkGrey};
  border-style: solid;
  border-width: 1px 0px 0px 0px;

  :last-child {
    margin-bottom: 200px;
  }
`;
export default ParametersRowWrapper;
