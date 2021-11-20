import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface Props {
  treeView: boolean;
}

const OptionsElement = styled.div<Props>`
  position: absolute;
  display: flex;
  align-items: center;
  border-left: 1px solid ${Color.Grey};
  border-right: 1px solid ${Color.Grey};
  height: 41px;
  width: 60px;
  transition: right 0.2s ease-in-out;
  cursor: pointer;

  &:first-child {
    right: 0px;
    border-right: none;
    border-left: none;

    &:hover {
      background-color: ${Color.LightBlue};
    }
  }

  &:nth-child(2) {
    right: 60px;
    border-left: none;

    &:hover {
      background-color: ${Color.LightBlue};
    }
  }

  &:nth-child(3) {
    right: 120px;
    border-left: none;
    background-color: ${(props) => !props.treeView && "#6F6F6F"};

    &:hover {
      background-color: ${(props) => props.treeView && Color.LightBlue};
    }
  }

  &:last-child {
    right: ${(props) => (props.treeView ? 120 : 181)}px;
    background-color: ${(props) => props.treeView && "#6F6F6F"};

    &:hover {
      background-color: ${(props) => !props.treeView && Color.LightBlue};
    }
  }

  .logo {
    margin: auto;
  }
`;
export default OptionsElement;
