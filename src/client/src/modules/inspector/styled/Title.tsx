import styled from "styled-components";
import { FontSize } from "../../../compLibrary/font";

const Title = styled.span`
  pointer-events: initial;
  font-size: ${FontSize.Header};
  height: 100%;

  :hover {
    cursor: pointer;
  }
`;

export default Title;
