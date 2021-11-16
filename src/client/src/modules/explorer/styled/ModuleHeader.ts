import styled from "styled-components";
import { FontType, FontSize } from "../../../compLibrary/font";

interface Props {
  isOpen: boolean;
}

const ModuleHeader = styled.div<Props>`
  position: relative;
  text-align: center;
  margin: 30px 0px;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  cursor: pointer;

  .text {
    position: relative;
    display: inline;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
  }

  .icon {
    position: absolute;
    right: ${(props) => (props.isOpen ? 97 : 10)}px;
    transition: right 0.2s ease-in-out;
  }
`;

export default ModuleHeader;
