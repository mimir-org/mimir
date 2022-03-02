import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";
import { FontSize, FontType } from "../../../../../../compLibrary/font";

export const SubProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;
`;

export const SubProjectsText = styled.p`
  text-align: center;
  color: ${Color.BLACK};
  font-size: ${FontSize.MEDIUM};
  font-family: ${FontType.Standard};
  padding: 10px 50px;
`;
