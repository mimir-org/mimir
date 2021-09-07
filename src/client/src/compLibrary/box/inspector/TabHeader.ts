import styled from "styled-components";
import { Color } from "../..";

const TabHeader = styled.div`
  display: inline-block;
  box-sizing: border-box;
  border-top-right-radius: 8px;
  border-top-left-radius: 6px;
  color: ${Color.Black};
  border-right: 1px solid ${Color.Grey};
  border-left: 1px solid ${Color.Grey};
  border-top: 1px solid ${Color.Grey};

  height: ${(props: { active: string }) => (props.active ? "39px" : "32px")};
  margin-top: ${(props: { active: string }) => (props.active ? "5px" : "12px")};
  background-color: ${(props: { active: string }) =>
    props.active ? `${Color.LightGrey}` : `${Color.DarkGrey}`};
  padding: ${(props: { active: string }) =>
    props.active ? "8px 20px 0px 20px;" : "5px 20px 0px 20px"};

  :hover {
    cursor: pointer;
  }
`;

export default TabHeader;
