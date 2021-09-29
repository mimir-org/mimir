import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

const ConnectViewFooter = styled.div`
  display: flex;
  position: absolute;
  top: 297px;
  left: -1px;
  width: 100%;
  height: 25px;
  border: 2px solid ${Color.FunctionTab};
  border-top: 1px solid ${Color.FunctionTab};
  border-radius: 0px 0px 5px 5px;
  background-color: ${Color.White};
  z-index: 2;

  .select {
    margin-top: 6px;
    padding: 0px 9px;
    width: 100%;

    &:hover {
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

export default ConnectViewFooter;
