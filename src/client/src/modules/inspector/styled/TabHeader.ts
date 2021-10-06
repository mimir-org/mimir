import styled from "styled-components";
import { Color } from "../../../compLibrary";

const TabHeader = styled.div`
  pointer-events: initial;
  box-sizing: border-box;
  min-width: 120px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  color: ${Color.Black};
  margin-right: 7px;
  height: ${(props: { active: boolean }) => (props.active ? 44 : 35)}px;
  margin-top: ${(props: { active: string }) => (props.active ? 0 : 9)}px;
  background-color: ${(props: { active: boolean; color: any }) => (props.active ? Color.LightGrey : props.color)};
  padding: ${(props: { active: string }) => (props.active ? "17px 20px 0px 20px;" : "8px 20px 0px 20px")};
  box-shadow: -4px 0 4px -5px rgba(0, 0, 0, 0.4), 4px 0 3px -5px rgba(0, 0, 0, 0.4);

  :hover {
    cursor: pointer;
  }
`;

export default TabHeader;
