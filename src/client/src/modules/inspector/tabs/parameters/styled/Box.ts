import styled from "styled-components";
import { FontSize } from "../../../../../compLibrary";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 73px;
  width: 155px;
  background-color: ${(props) => props.color};
  border-radius: 9px;
  margin: 13px;
  font-size: ${FontSize.Medium};

  .text {
    display: flex;
    align-items: center;
    position: relative;
    top: -10px;
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
`;
export default Box;
