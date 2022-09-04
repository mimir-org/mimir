import styled from "styled-components";
import { Color } from "../../../../../../assets/color/Color";
import { FontSize, FontType } from "../../../../../../assets/font";

export const SubProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
`;

export const SubProjectsText = styled.p`
  text-align: center;
  color: ${Color.BLACK};
  font-size: ${FontSize.MEDIUM};
  font-family: ${FontType.STANDARD};
  padding: 10px 50px;
`;
