import styled from "styled-components";
import { FontType, FontSize } from "../../../componentLibrary";

const ModuleHeader = styled.div`
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  text-align: center;
  padding-top: 5px;
  height: 25px;
  position: relative;
  margin-left: ${(props) => props.library && 7}px;
  margin-right: ${(props) => props.explorer && 7}px;
  margin-top: ${(props) => !props.inspector && "22px"};
  margin-bottom: ${(props) => props.inspector && "12px"};
  width: ${(props) => (props.inspector ? "154px" : "initial")};
  float: ${(props) => props.inspector && "right"};
  width: ${(props) => props.legend && "100px"};
  left: ${(props) => props.legend && "110px"};

  .text {
    position: relative;
    opacity: ${(props) => (props.visible ? "1" : "0")};
    right: ${(props) => props.library && "140px"};
    left: ${(props) => props.explorer && "140px"};
    float: ${(props) => (props.library ? "right" : "left")};
    bottom: 18px;
    transition: opacity 0.2s ease;
  }

  .text_inspector {
    display: inline;
    vertical-align: top;
    margin-left: 5px;
  }

  .icon {
    position: ${(props) => !props.visible && "absolute"};
    cursor: ${(props) => !props.legend && "pointer"};
    float: ${(props) => (props.explorer ? "right" : "left")};
    right: ${(props) => props.explorer && "3px"};
    left: ${(props) => props.library && "5px"};
  }

  .icon_inspector {
    cursor: pointer;
    float: right;
    bottom: 25px;
    margin-top: 6px;
  }

  .module-icon {
    position: absolute;
    right: ${(props) =>
      props.explorer && props.visible
        ? "190px"
        : props.explorer
        ? "2px"
        : "85px"};
    left: ${(props) =>
      props.library && props.visible
        ? "100px"
        : props.library
        ? "0px"
        : "unset"};
    top: ${(props) => (props.visible || props.legend ? "unset" : "42px")};
  }
`;

export default ModuleHeader;
