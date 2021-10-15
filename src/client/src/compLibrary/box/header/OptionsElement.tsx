import styled from "styled-components";
import { Color } from "../..";

interface Props {
  treeView: boolean;
}

const OptionsElement = styled.div<Props>`
  cursor: pointer;
  position: absolute;
  display: inline;
  border-left: 1px solid ${Color.Grey};
  border-right: 1px solid ${Color.Grey};
  padding: 12px;
  top: -60px;
  right: -200px;
  height: 17px;
  width: 20px;
  text-align: center;
  transition: right 0.2s ease-in-out;
  background-color: transparent;

  &:first-child {
    right: -288px;
    border-right: none;
    border-left: none;
    &:hover {
      background-color: ${Color.LightBlue};
    }
  }

  &:nth-child(2) {
    right: -244px;
    border-left: none;
    &:hover {
      background-color: ${Color.LightBlue};
    }
  }

  &:nth-child(3) {
    right: -199px;
    border-left: none;
    background-color: ${(props) => !props.treeView && "#6F6F6F"};
    &:hover {
      background-color: ${(props) => props.treeView && Color.LightBlue};
    }
  }

  &:last-child {
    right: ${(props) => (props.treeView ? -199 : -154)}px;
    background-color: ${(props) => props.treeView && "#6F6F6F"};

    &:hover {
      background-color: ${(props) => !props.treeView && Color.LightBlue};
    }
  }
`;
export default OptionsElement;
