import styled from "styled-components";
import { FontSize } from "../../../../compLibrary/font";

const ElementBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 5px;
  margin-bottom: 12px;

  .text {
    position: relative;
    margin-left: 30px;
    bottom: 1px;
    font-size: ${FontSize.Standard};
    width: 220px;
  }
`;

export default ElementBox;
