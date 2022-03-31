import styled from "styled-components";
import { FontSize, FontWeight } from "../../../../../../compLibrary/font";

interface HeaderContainerProps {
  color: string;
}

export const HeaderContainer = styled.div<HeaderContainerProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 30px;
  width: 100%;
  border-radius: 8px 8px 0 0;
  background-color: ${(props) => props.color};
  z-index: 1;
`;

interface HeaderGroupProps {
  gap?: string;
}

export const HeaderGroup = styled.div<HeaderGroupProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${(props) => props.gap ?? "revert"};
`;

export const HeaderTitle = styled.span`
  font-size: ${FontSize.STANDARD};
  font-weight: ${FontWeight.BOLD};
`;

export const LogoBox = styled.span`
  pointer-events: none;
  width: 53px;

  img {
    width: inherit;
    filter: saturate(0%);
  }
`;
