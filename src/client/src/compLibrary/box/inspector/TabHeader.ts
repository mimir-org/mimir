import styled from "styled-components";
import { Color } from "../..";

const TabHeader = styled.div`
  display: inline-block;
  box-sizing: border-box;
  border-top-right-radius: 8px;
  border-top-left-radius: 6px;
  color: ${Color.Black};
  margin-right: 8px;

  height: ${(props: { active: string }) => (props.active ? "44px" : "35px")};
  margin-top: ${(props: { active: string }) => (props.active ? "0px" : "9px")};

  background-color: ${(props) =>
    props.active ? Color.GreyInspector : props.color};

  padding: ${(props: { active: string }) =>
    props.active ? "12px 20px 0px 20px;" : "8px 20px 0px 20px"};

  box-shadow: 0 5px 5px -1.5px #585858;

  :hover {
    cursor: pointer;
  }
`;

export default TabHeader;
