import styled from "styled-components";
import { FontType, FontSize } from "../../../compLibrary/font";

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
  padding-top: 5px;
  height: 25px;
  position: relative;
  margin-right: 7px;
  margin-top: 22px;

  .text {
    position: relative;
    opacity: ${(props) => (props.visible ? 1 : 0)};
    left: 140px;
    float: left;
    bottom: 18px;
    transition: opacity 0.2s ease;
  }

  .icon {
    position: ${(props) => !props.visible && "absolute"};
    cursor: pointer;
    float: right;
    right: 4px;
  }
`;

export default ModuleHeader;
