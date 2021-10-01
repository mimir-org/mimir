import styled from "styled-components";
import { Color } from "../../../compLibrary";

const TabHeader = styled.div`
  box-sizing: border-box;
  min-width: 120px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  color: ${Color.Black};
  margin-right: 7px;
  height: ${(props) => (props.active ? "44px" : "35px")};
  margin-top: ${(props: { active: string }) => (props.active ? "0px" : "9px")};

  background-color: ${(props) =>
    props.active ? Color.LightGrey : props.color};

  padding: ${(props: { active: string }) =>
    props.active ? "17px 20px 0px 20px;" : "8px 20px 0px 20px"};

  box-shadow: -4px 0 4px -5px rgba(0, 0, 0, 0.4),
    4px 0 3px -5px rgba(0, 0, 0, 0.4);

  :hover {
    cursor: pointer;
  }
`;

export default TabHeader;
