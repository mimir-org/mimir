import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";
import { FontSize, FontType } from "../../../../../../compLibrary/font";

export const SubProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: inherit;

  p {
    text-align: center;
    color: ${Color.Black};
    font-size: ${FontSize.Medium};
    font-family:${FontType.Standard}
    padding: 10px 50px;
  }

`;
