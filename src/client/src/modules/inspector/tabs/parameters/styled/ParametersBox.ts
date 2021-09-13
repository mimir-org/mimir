import styled from "styled-components";
import { FontSize } from "../../../../../compLibrary";

const ParametersBox = styled.div`
  display: flex;
  height: 90px;
  width: 180px;
  background-color: ${(props) => props.color};
  border-radius: 9px;
  margin: 15px;
  font-size: ${FontSize.Medium};

  .text {
    margin-top: 22px;
    padding-left: 10px;
  }

  .icon {
    position: relative;
    left: 155px;
  }
`;
export default ParametersBox;
