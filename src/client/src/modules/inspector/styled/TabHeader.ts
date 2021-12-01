import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface Props {
  active: boolean;
  color: string;
}

const TabHeader = styled.div<Props>`
  pointer-events: initial;
  box-sizing: border-box;
  min-width: 120px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  color: ${Color.Black};
  margin-right: 7px;
  height: ${(props) => (props.active ? 44 : 35)}px;
  margin-top: ${(props) => (props.active ? 0 : 9)}px;
  background-color: ${(props) => (props.active ? Color.GreyLighter : props.color)};
  padding: ${(props) => (props.active ? "17px 5px 0px 5px;" : "8px 5px 0px 5px")};
  box-shadow: -4px 0 4px -5px rgba(0, 0, 0, 0.4), 4px 0 3px -5px rgba(0, 0, 0, 0.4);

  :hover {
    cursor: pointer;
  }
`;

export default TabHeader;
