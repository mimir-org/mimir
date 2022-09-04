import styled from "styled-components";
import { Color } from "../../../../../../../assets/color/Color";
import { FontSize, FontWeight } from "../../../../../../../assets/font";

export const ProjectDetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

export const ProjectDetailsSearchContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 602px;
`;

export const ProjectDetailsRightContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 356px;
  min-height: 506px;
`;

export const ProjectOptionsButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  button {
    border-radius: 5px;
    width: 175px;
    height: 34px;
    margin-top: 20px;
    background: ${Color.WHITE};
    font-weight: ${FontWeight.NORMAL};
    justify-content: start;
  }

  img {
    margin-left: auto;
    padding-right: 3px;
  }

  .button-text {
    text-align: left;
    white-space: nowrap;
    font-size: ${FontSize.STANDARD};
  }
`;
