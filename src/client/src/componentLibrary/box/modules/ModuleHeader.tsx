import styled from "styled-components";
import { FontType, FontSize } from "../../../componentLibrary";

const ModuleHeader = styled.div`
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  text-align: center;
  padding-top: 5px;
  height: 25px;
  position: relative;
  margin-left: ${(props) => (props.explorer ? 0 : 7)}px;
  margin-right: ${(props) => (props.library ? 0 : 7)}px;
  margin-top: ${(props) => (props.inspector ? "0px" : "22px")};
  margin-bottom: ${(props) => (props.inspector ? "0px" : "12px")};
  width: ${(props) => (props.inspector ? "154px" : "initial")};
  float: ${(props) => (props.inspector ? "right" : "none")};
  width: ${(props) => (props.legend ? "100px" : "initial")};
  left: ${(props) => (props.legend ? "110px" : "initial")};

  .text {
    position: relative;
    bottom: 18px;
    right: 107px;
    float: right;
  }
  .text_inspector {
    display: inline;
    vertical-align: top;
    margin-left: 5px;
  }
  .icon {
    cursor: ${(props) => (props.legend ? "initial" : "pointer")};
    float: ${(props) => (props.explorer ? "right" : "left")};
  }
  .icon_inspector {
    cursor: pointer;
    float: right;
    bottom: 25px;
    margin-top: 6px;
  }
`;

export default ModuleHeader;
