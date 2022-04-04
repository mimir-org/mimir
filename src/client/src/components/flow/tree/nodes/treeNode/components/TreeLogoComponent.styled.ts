import styled from "styled-components";
import { FontWeight } from "../../../../../../compLibrary/font";
import { SymbolImage } from "../../../../../../compLibrary/symbol/Symbol.styled";

export const TreeLogoWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 4px;
  padding: 0 8px;
`;

export const TreeNodeNameBox = styled.p`
  margin: 0;
  font-weight: ${FontWeight.BOLD};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SymbolBox = styled.div`
  max-height: 30px;

  ${SymbolImage} {
    min-height: 30px;
  }
`;

export const LogoBox = styled.div`
  height: 20px;
  width: 50px;
  align-self: flex-start;
  pointer-events: none;

  img {
    min-height: 100%;
    filter: brightness(0%);
  }
`;
