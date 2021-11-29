import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface Props {
  treeView: boolean;
}

const OptionsElement = styled.div<Props>`
  position: relative;
  display: flex;
  height: 41px;
  width: 60px;
  cursor: pointer;

  &:hover {
    background-color: ${Color.BlueLight};
  }

  &:first-child {
    background-color: ${(props) => props.treeView && Color.GreyToolBarSelected};
    border-left: 1px solid ${Color.Grey};
    border-right: 1px solid ${Color.Grey};
  }

  &:nth-child(2) {
    background-color: ${(props) => !props.treeView && Color.GreyToolBarSelected};
  }

  &:last-child {
    border-left: 1px solid ${Color.Grey};
  }

  .logo {
    margin: auto;
  }
`;
export default OptionsElement;
