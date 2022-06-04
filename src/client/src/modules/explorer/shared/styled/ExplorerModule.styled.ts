import styled from "styled-components";
import { FontSize } from "../../../../assets/font";

export const ExplorerModuleHeader = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 24px 0;
  font-size: ${FontSize.HEADER};
  cursor: pointer;
  border: 0;
  background: transparent;
`;

export const ExplorerModuleBody = styled.div`
  height: calc(100% - 127px);
  overflow: auto;
`;
