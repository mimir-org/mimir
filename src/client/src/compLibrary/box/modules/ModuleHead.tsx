import styled from "styled-components";
import { FontType, FontSize, Color } from "../..";

interface Props {
  legend?: boolean;
  inspector?: boolean;
  visible?: boolean;
  explorer?: boolean;
  library?: boolean;
}

const ModuleHeader = styled.div<Props>`
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  text-align: center;
  padding-top: ${(props) => (props.legend ? 15 : 5)}px;
  height: ${(props) => (props.legend ? 60 : 25)}px;
  position: relative;
  margin-left: ${(props) => props.library && "7px"};
  margin-right: ${(props) => props.explorer && "7px"};
  margin-top: ${(props) => !props.inspector && !props.legend && "22px"};
  margin-bottom: ${(props) => props.inspector && "12px"};
  width: ${(props) => (props.inspector ? "154px" : "initial")};
  float: ${(props) => props.inspector && "right"};
  border-top: ${(props) => props.legend && "1px solid" + Color.Grey};

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
    right: ${(props) => props.explorer && "4px"};
    left: ${(props) => props.library && "5px"};
  }

  .icon_inspector {
    cursor: pointer;
    float: right;
    bottom: 25px;
    margin-top: 6px;
  }
`;

export default ModuleHeader;
