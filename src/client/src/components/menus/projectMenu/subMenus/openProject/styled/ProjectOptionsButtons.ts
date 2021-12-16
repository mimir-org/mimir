import styled from "styled-components";
import { Color } from "../../../../../../compLibrary/colors";
import { FontSize, FontWeight } from "../../../../../../compLibrary/font";

const ProjectOptionsButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  button {
    border-radius: 5px;
    width: 175px;
    height: 34px;
    margin-top: 20px;
    background: ${Color.White};
    font-weight: ${FontWeight.Normal};
    justify-content: start;
  }

  img {
    margin-left: auto;
    padding-right: 3px;
  }

  .button-text {
    text-align: left;
    white-space: nowrap;
    font-size: ${FontSize.Standard};
  }
`;

export default ProjectOptionsButtons;
