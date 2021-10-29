import styled from "styled-components";
import { FontSize } from "../../../../compLibrary";

const ElementBox = styled.div`
  position: relative;
  margin-left: 5px;
  margin-bottom: 30px;

  .text {
    position: relative;
    margin-left: 22px;
    bottom: 1px;
    font-size: ${FontSize.Standard};
  }
`;

export default ElementBox;
