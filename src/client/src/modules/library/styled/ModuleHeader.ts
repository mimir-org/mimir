import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontType, FontSize } from "../../../compLibrary/font";

interface Props {
  isOpen?: boolean;
  legend?: boolean;
}

const ModuleHeader = styled.div<Props>`
  position: relative;
  text-align: center;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  cursor: pointer;
  padding-top: ${(props) => props.legend && "15px"};
  border-top: ${(props) => props.legend && "1px solid" + Color.Grey};
  margin-top: ${(props) => !props.legend && "30px"};
  margin-bottom: ${(props) => !props.legend && "30px"};

  .text {
    position: relative;
    display: inline;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
  }

  .icon {
    position: absolute;
    left: ${(props) => (props.isOpen ? 97 : 10)}px;
    transition: left 0.2s ease-in-out;
  }
`;

export default ModuleHeader;
