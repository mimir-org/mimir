import styled from "styled-components";
import { Color, FontWeight } from "../../../../componentLibrary";

const TabHeader = styled.div`
  display: inline-block;
  box-sizing: border-box;
  border-top-right-radius: 8px;
  border-top-left-radius: 6px;
  color: ${Color.Black};
  border-right: 1px solid ${Color.Grey};
  border-left: 1px solid ${Color.Grey};
  border-top: 0px solid ${Color.Grey};

  height: ${(props: { active: string }) => (props.active ? "36px" : "32px")};
  margin-top: ${(props: { active: string }) => (props.active ? "0px" : "4px")};
  background-color: ${(props: { active: string }) =>
    props.active ? `${Color.LightGrey}` : `${Color.DarkGrey}`};
  padding: ${(props: { active: string }) =>
    props.active ? "12px 20px 0px 20px;" : "8px 20px 0px 20px"};
  text-decoration: ${(props: { active: string }) =>
    props.active ? "underline" : "none"};
  font-weight: ${(props: { active: string }) =>
    props.active ? `${FontWeight.Bold}` : `${FontWeight.Normal}`};

  :hover {
    cursor: pointer;
  }
`;

export default TabHeader;
