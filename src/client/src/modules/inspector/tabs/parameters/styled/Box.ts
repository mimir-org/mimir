import styled from "styled-components";
import { FontSize } from "../../../../../compLibrary";

const Box = styled.div`
  position: relative;
  height: 71px;
  width: 151px;
  background-color: ${(props) => props.color};
  border-radius: 9px;
  margin: 15px;
  font-size: ${FontSize.Medium};

  .text {
    position: absolute;
    left: 8px;
    top: 15px;
    padding-right: 5px;
  }

  .icon {
    position: relative;
    left: 126px;
    top: -1px;

    :hover {
      cursor: pointer;
    }
  }
`;
export default Box;
