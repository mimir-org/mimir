import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize } from "../../../compLibrary/font";

interface Props {
  disabled: boolean;
  bottomLine: boolean;
}

const ProjectMenuElementBox = styled.div<Props>`
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${(props) => (props.disabled ? Color.GreyInactive : Color.BlueMagenta)};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  border-width: 0px;
  border-bottom: ${(props) => (props.bottomLine ? 1 : 0)}px solid ${Color.Grey};

  .text {
    position: relative;
    display: flex;
    margin-left: 10px;
    vertical-align: super;
    font-size: ${FontSize.Standard};
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
