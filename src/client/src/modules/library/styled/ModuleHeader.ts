import styled from "styled-components";
import { Color } from "../../../compLibrary";
import { FontType, FontSize } from "../../../compLibrary/font";

interface Props {
  visible?: boolean;
  legend?: boolean;
}

const ModuleHeader = styled.div<Props>`
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  text-align: center;
  padding-top: ${(props) => (props.legend ? 15 : 5)}px;
  height: ${(props) => (props.legend ? 60 : 25)}px;
  border-top: ${(props) => props.legend && "1px solid" + Color.Grey};
  position: relative;
  margin-left: ${(props) => !props.legend && "7px"};
  margin-top: ${(props) => !props.legend && "22px"};
  width: initial;

  .text {
    position: relative;
    opacity: ${(props) => (props.visible ? 1 : 0)};
    right: ${(props) => !props.legend && "140px"};
    float: ${(props) => !props.legend && "right"};
    bottom: 18px;
    transition: opacity 0.2s ease;
  }

  .icon {
    position: ${(props) => !props.visible && "absolute"};
    cursor: ${(props) => !props.legend && "pointer"};
    float: left;
    left: ${(props) => !props.legend && "5px"};
    float: ${(props) => !props.legend && "left"};
  }
`;

export default ModuleHeader;
