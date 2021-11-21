import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontType, FontSize } from "../../../compLibrary/font";

interface Props {
  isOpen?: boolean;
  legend?: boolean;
}

const ModuleHeader = styled.div<Props>`
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: ${(props) => !props.legend && "10px"};
  margin-bottom: ${(props) => !props.legend && "5px"};
  border-top: ${(props) => props.legend && "1px solid" + Color.Grey};
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  cursor: pointer;

  .text {
    position: relative;
    display: flex;
    margin-left: 10px;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
  }

  .icon {
    position: relative;
    left: ${(props) => !props.isOpen && "32px"};
    transition: left 0.2s ease-in-out;
  }
`;

export default ModuleHeader;
