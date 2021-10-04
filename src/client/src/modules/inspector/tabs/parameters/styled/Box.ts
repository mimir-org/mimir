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
    position: relative;
    top: -5px;
    margin: 0px auto 0px 10px;
  }

  .icon {
    display: flex;
  }

  img {
    margin-left: auto;

    width: 30px;

    :hover {
      cursor: pointer;
    }
  }
`;
export default Box;
