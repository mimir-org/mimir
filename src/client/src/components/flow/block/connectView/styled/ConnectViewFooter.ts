import styled from "styled-components";
import { Color, Size } from "../../../../../compLibrary";

const ConnectViewFooter = styled.div`
  display: flex;
  position: relative;
  min-width: ${Size.Node_Width}px;
  height: 25px;
  border: 2px solid ${Color.FunctionTab};
  border-top: 1px solid ${Color.FunctionTab};
  border-radius: 0px 0px 5px 5px;
  background-color: ${Color.White};
  z-index: 2;

  .select {
    margin: 6px 10px 0px 6px;
    width: 100%;

    &:hover {
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

export default ConnectViewFooter;
