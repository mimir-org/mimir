import styled from "styled-components";
import { FontWeight } from "../../../../componentLibrary";

const TabTitle = styled.p`
  font-weight: ${(props: { active: boolean }) =>
    props.active ? `${FontWeight.Bold}` : `${FontWeight.Normal}`};
  display: inline;
  text-decoration: ${(props: { active: boolean }) =>
    props.active ? "underline" : "none"};
`;

export default TabTitle;
