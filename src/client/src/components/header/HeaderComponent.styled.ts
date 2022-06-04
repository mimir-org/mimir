import styled from "styled-components";
import { Size } from "../../assets/size/Size";
import { Color } from "../../assets/color/Color";

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${Size.TOPMENU_HEIGHT}px;
  background-color: ${Color.BASTILLE};
`;

export const HeaderRightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  height: 100%;
`;

export const LogoBox = styled.div`
  flex-shrink: 0;
  width: 115px;
  height: 30px;
  margin-left: 45px;
`;

export const CompanyLogoBox = styled.div`
  flex-shrink: 0;
  display: flex;
  pointer-events: none;
`;
