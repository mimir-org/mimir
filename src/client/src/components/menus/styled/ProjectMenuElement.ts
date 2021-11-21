import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize } from "../../../compLibrary/font";

interface Props {
  disabled: boolean;
}

const ProjectMenuElement = styled.div<Props>`
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${Color.BlueMagenta};
  cursor: pointer;

  .text {
    position: relative;
    display: flex;
    margin-left: 10px;
    vertical-align: super;
    font-size: ${FontSize.Standard};
    font-weight: ${(props) => props.disabled && 300};
    font-style: ${(props) => props.disabled && "italic"};
  }

  .icon {
    display: flex;
    width: 18px;
    height: 18px;
    position: relative;
    bottom: 0px;
    left: 0px;
  }

  &:hover {
    background-color: ${(props) => !props.disabled && Color.LightBlue};
    text-decoration: ${(props) => !props.disabled && "underline"};
  }

  &:last-child {
    border-radius: 0px 0px 10px 10px;
  }
`;

export default ProjectMenuElement;
