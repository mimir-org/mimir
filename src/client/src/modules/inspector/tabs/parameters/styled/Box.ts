import styled from "styled-components";
import { FontSize } from "../../../../../compLibrary";

const Box = styled.div`
  position: relative;
  height: 73px;
  width: 155px;
  background-color: ${(props) => props.color};
  border-radius: 9px;
  margin: 13px;
  font-size: ${FontSize.Medium};

  .text {
    position: absolute;
    left: 8px;
    top: 15px;
    padding-right: 5px;
  }

  .icon {
    display: flex;
    img {
      margin-left: auto;

      :hover {
        cursor: pointer;
      }
    }
  }
`;
export default Box;
