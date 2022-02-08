import styled from "styled-components";
import { FontSize, FontType } from "../../../compLibrary/font";

interface Props {
  isOpen: boolean;
}

const ModuleHeader = styled.button<Props>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 24px 0;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  cursor: pointer;
  border: 0;
  background: transparent;

  span {
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
  }

  img {
    position: relative;
    right: ${(props) => !props.isOpen && "40px"};
    transition: right 0.2s ease-in-out;
  }
`;

export default ModuleHeader;
