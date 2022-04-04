import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary/colors/Color";
import { FontSize } from "../../../../../../../compLibrary/font";

export const ProjectDescriptionBox = styled.div`
  box-sizing: border-box;
  min-width: 356px;
  min-height: 415px;
  overflow-y: auto;
  overflow-x: hidden;
  border: 1px solid ${Color.BLACK};
  background-color: ${Color.WHITE};
  border-radius: 5px;
  margin-top: 44px;
`;

export const ProjectDescriptionBody = styled.div`
  padding: 0 13px;

  .text-about {
    font-weight: normal;
    font-size: ${FontSize.SMALL};
  }

  .libraries,
  .sub-proj,
  .templates {
    display: none;
  }
`;
