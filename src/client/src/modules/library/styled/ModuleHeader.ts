import styled from "styled-components";
import { FontSize, FontType } from "../../../compLibrary/font";

interface Props {
  isOpen?: boolean;
  legend?: boolean;
}

const ModuleHeader = styled.div<Props>`
  display: flex;
  position: relative;
  justify-content: center;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Header};
  cursor: pointer;
`;

export default ModuleHeader;
