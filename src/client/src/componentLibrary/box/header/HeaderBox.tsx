import styled from "styled-components";
import { Color } from "../../../componentLibrary";

const HeaderBox = styled.div`
  display: flex;
  height: 50px;
  background-color: ${Color.DeepCyan} !important;
  position: relative !important;
  box-shadow: none !important;

  .view_icon {
    padding: 5px 4px 0px 5px;
  }

  .line {
    width: 1px;
    height: 28px;
    position: absolute;
    border-color: ${Color.White};
    border-style: solid;
    border-width: 0px 1px 0px 0px;
    top: 0px;
    margin-left: 50px;
  }
`;

export default HeaderBox;
