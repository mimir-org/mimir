import styled from "styled-components";
import { FontSize, FontType } from "../../../compLibrary/font";

interface Props {
  isOpen: boolean;
}

const ModuleHeader = styled.div<Props>`
  display: flex;
  position: relative;
  justify-content: center;
  margin-top: 10px;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  cursor: pointer;

  .text {
    position: relative;
    display: flex;
    margin-right: 15px;
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
  }

  .icon {
    position: relative;
    right: ${(props) => !props.isOpen && "40px"};
    transition: right 0.2s ease-in-out;
  }
`;

export default ModuleHeader;
