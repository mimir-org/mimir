import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontType, FontSize } from "../../../compLibrary/font";

interface Props {
  isOpen?: boolean;
  legend?: boolean;
}

const ModuleHeader = styled.div<Props>`
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  text-align: center;
  position: relative;
  cursor: pointer;
  padding-top: ${(props) => (props.legend ? 15 : 5)}px;
  border-top: ${(props) => props.legend && "1px solid" + Color.Grey};
  margin-top: ${(props) => !props.legend && "22px"};

  .text {
    position: relative;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    bottom: 18px;
    transition: opacity 0.2s ease-in-out;
  }

  .icon {
    position: absolute;
    left: ${(props) => (props.isOpen ? 97 : 10)}px;
    transition: left 0.2s ease-in-out;
  }
`;

export default ModuleHeader;
