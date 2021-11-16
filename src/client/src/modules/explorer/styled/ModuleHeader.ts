import styled from "styled-components";
import { FontType, FontSize } from "../../../compLibrary/font";

interface Props {
  legend?: boolean;
  inspector?: boolean;
  isOpen?: boolean;
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
  cursor: pointer;

  .text {
    position: relative;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    left: 140px;
    float: left;
    bottom: 18px;
    transition: opacity 0.2s ease;
  }

  .icon {
    cursor: pointer;
    position: absolute;
    display: flex;
    right: ${(props) => (props.isOpen ? 80 : 4)}px;
    transition: right 0.2s ease-in-out;
  }
`;

export default ModuleHeader;
