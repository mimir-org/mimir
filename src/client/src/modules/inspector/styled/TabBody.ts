import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

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

  & > hr {
    margin: 16px 0 0;
    color: ${Color.GreyDark};
    border-style: solid;
    border-width: 1px 0 0 0;
  }

  &:hover {
    cursor: default;
  }
`;
export default TabBody;
