import styled from "styled-components";
import { Color } from "../..";

const OptionsElement = styled.div`
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
  background-color: ${(props: { treeView: boolean }) => (props.treeView ? Color.Grey : "transparent")};

  &:hover {
    background-color: ${Color.LightBlue};
  }

  &:first-child {
    right: -288px;
    border-right: none;
    border-left: none;
  }

  &:nth-child(2) {
    right: -244px;
    border-left: none;
  }

  &:nth-child(3) {
    right: -199px;
    border-left: none;
    background-color: ${(props: { treeView: boolean }) => (!props.treeView ? "#6F6F6F" : "transparent")};
    &:hover {
      background-color: ${(props: { treeView: boolean }) => props.treeView && Color.LightBlue};
    }
  }

  &:last-child {
    right: -154px;
    background-color: ${(props: { treeView: boolean }) => (props.treeView ? "#6F6F6F" : "transparent")};

    &:hover {
      background-color: ${(props: { treeView: boolean }) => !props.treeView && Color.LightBlue};
    }
  }
`;
export default OptionsElement;
