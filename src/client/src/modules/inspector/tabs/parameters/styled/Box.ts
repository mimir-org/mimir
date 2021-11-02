import styled from "styled-components";
import { FontSize } from "../../../../../compLibrary";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 71px;
  width: 151px;
  background-color: ${(props) => props.color};
  border-radius: 9px;
  margin: 20px;
  font-size: ${FontSize.Small};

  .text {
    display: flex;
    align-items: center;
    position: relative;
    top: -13px;
    margin: 0px auto 0px 10px;
    width: 125px;
    height: 33px;
  }

  .icon {
    display: flex;
  }

  svg {
    margin-left: auto;
    width: 30px;

    :hover {
      cursor: pointer;
    }
  }

  .hide-icon {
    visibility: hidden;
    svg:hover {
      cursor: default;
    }
  }
`;
export default Box;
