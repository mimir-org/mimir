import styled from "styled-components";
import { FontSize } from "../../../../../compLibrary";

const Box = styled.div`
  display: flex;
  position: absolute;
  height: 71px;
  width: 151px;
  background-color: ${(props) => props.color};
  border-radius: 9px;
  margin: 15px;
  font-size: ${FontSize.Medium};

  .text {
    position: absolute;
    left: 8px;
    margin-top: 15px;
  }

  .icon {
    position: relative;
    left: 132px;
    top: 8px;
    height: 20px;
  }
`;
export default Box;
