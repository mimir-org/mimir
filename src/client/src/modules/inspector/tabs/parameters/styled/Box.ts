import styled from "styled-components";
import { FontSize } from "../../../../../compLibrary";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 73px;
  width: 155px;
  background-color: ${(props) => props.color};
  border-radius: 9px;
  margin: 13px;
  font-size: ${FontSize.Medium};

  .text {
    margin: 0px auto 0px 10px;
  }

  .icon {
    display: flex;
  }

  img {
    margin-left: auto;

    :hover {
      cursor: pointer;
    }
  }
`;
export default Box;
