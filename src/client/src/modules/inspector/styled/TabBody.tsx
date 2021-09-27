import styled from "styled-components";
import { Color } from "../../../compLibrary";

const TabBody = styled.div`
  top: 44px;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  .container {
    display: flex;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    min-width: 1400px;
  }

  hr {
    margin-top: 70px;
    margin-bottom: 0px;
    color: ${Color.DarkGrey};
    border-style: solid;
    border-width: 1px 0px 0px 0px;
  }
`;
export default TabBody;
