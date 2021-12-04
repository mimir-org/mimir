import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize, FontWeight } from "../../../compLibrary/font";

interface Props {
  disabled: boolean;
  bottomLine: boolean;
}

const ProjectMenuElementBox = styled.div<Props>`
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${Color.BlueMagenta};
  cursor: pointer;
  border-width: 0px;
  border-bottom: ${(props) => (props.bottomLine ? 1 : 0)}px;
  border-style: solid;
  border-color: ${Color.Grey};

  .text {
    position: relative;
    display: flex;
    margin-left: 10px;
    vertical-align: super;
    font-size: ${FontSize.Standard};
    font-weight: ${(props) => props.disabled && FontWeight.Light};
    font-style: ${(props) => props.disabled && FontWeight.Italic};
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
    background-color: ${(props) => !props.disabled && Color.BlueLight};
    text-decoration: ${(props) => !props.disabled && "underline"};
  }

  &:last-child {
    border-radius: 0px 0px 10px 10px;
  }
`;

export default ProjectMenuElementBox;
