import styled from "styled-components";
import { FontType, FontSize } from "../../../compLibrary/font";

interface Props {
  isOpen: boolean;
}

const ModuleHeader = styled.div<Props>`
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  padding-top: 5px;
  position: relative;
  margin-top: 22px;
  cursor: pointer;

  .text {
    position: relative;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    left: 125px;
    bottom: 18px;
    transition: opacity 0.2s ease-in-out;
  }

  .icon {
    position: absolute;
    right: ${(props) => (props.isOpen ? 97 : 10)}px;
    transition: right 0.2s ease-in-out;
  }
`;

export default ModuleHeader;
