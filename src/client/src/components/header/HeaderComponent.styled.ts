import styled from "styled-components";
import { Size } from "../../compLibrary/size";
import { Color } from "../../compLibrary/colors";

export const HeaderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${Size.TopMenu_Height}px;
  background-color: ${Color.BlueMagenta};
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
