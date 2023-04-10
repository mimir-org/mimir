import styled from "styled-components";
import { Color } from "../../../assets/color/Color";
import { FontSize, FontWeight } from "../../../assets/font";

export interface ProjectDataBoxProps {
  selected: boolean;
}

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

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${Color.BASTILLE};
  margin: 20px 0;
`;

export const SearchBarInput = styled.input.attrs(() => ({ type: "text" }))`
  width: 100%;
  font-size: ${FontSize.SUBHEADER};
  padding: 5px;
  border: 0;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${Color.GREY};
    font-style: italic;
    opacity: 0.5;
  }
`;

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

export const ProjectDataBox = styled.button<ProjectDataBoxProps>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 33px;
  padding: 0 10px 0 6px;
  font-weight: ${(props) => (props.selected ? FontWeight.BOLD : FontWeight.NORMAL)};
  text-decoration: ${(props) => props.selected && "underline"};
  font-size: ${FontSize.SMALL};
  color: ${Color.BLACK};
  border: none;
  background: transparent;
  cursor: pointer;

  span {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .name {
    width: 40%;
    text-align: left;
  }

  .owner {
    width: 20%;
  }

  .version {
    text-align: center;
    width: 25%;
  }

  .edited {
    text-align: right;
    width: 15%;
  }

  &:nth-of-type(odd) {
    background: ${Color.LAVANDER_WEB_LIST};
  }

  &:hover {
    background: ${Color.LAVANDER_WEB_HOVER};
  }
`;

export const ProjectListBox = styled.div`
  position: relative;
  max-height: 350px;

  :before {
    content: "";
    width: 1px;
    height: 5px;
    background: ${Color.BASTILLE};
    border-radius: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  :after {
    content: "";
    width: 1px;
    height: 5px;
    background: ${Color.BASTILLE};
    border-radius: 1px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

export const ProjectListLabels = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: ${FontWeight.NORMAL};
  font-size: ${FontSize.STANDARD};
  color: ${Color.BLACK};
  border-bottom: 2px solid ${Color.BASTILLE};
  padding-right: 10px;

  p {
    white-space: nowrap;
    margin-bottom: 2px;
  }

  .name {
    width: 40%;
  }

  .owner {
    padding-left: 4px;
    width: 20%;
  }

  .version {
    text-align: center;
    width: 25%;
  }

  .edited {
    text-align: right;
    width: 15%;
  }
`;

export const ProjectDataContainer = styled.div`
  max-height: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  border-bottom: 1px solid ${Color.BASTILLE};
  box-shadow: 0 0, 0 -3px 3px -3px rgba(0, 0, 0, 0.2) inset, 0 0, 0 0;
`;
