import styled from "styled-components";
import { Color } from "../..";

const TabHeader = styled.div`
  display: inline-block;
  position: relative;
  top: -44px;
  box-sizing: border-box;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  color: ${Color.Black};
  margin-right: 7px;
  height: 33px;
  margin-top: ${(props: { active: string }) => (props.active ? "0px" : "9px")};

  box-shadow: ${(props) => !props.active && "#888 0px 2px 4px"};

  background-color: ${(props) =>
    props.active ? props.background : props.color};

  padding: ${(props: { active: string }) =>
    props.active ? "12px 20px 0px 20px;" : "8px 20px 0px 20px"};

  :hover {
    cursor: pointer;
  }
`;

export default TabHeader;
