import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

const ParametersRowWrapper = styled.div`
  display: flex;
  flex-direction: column;

  border-top: 1px solid ${Color.DarkGrey};

  :last-child {
    margin-bottom: 200px;
  }
`;
export default ParametersRowWrapper;
