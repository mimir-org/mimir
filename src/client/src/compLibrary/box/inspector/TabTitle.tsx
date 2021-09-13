import styled from "styled-components";
import { FontWeight } from "../..";

const TabTitle = styled.p`
  display: inline;
  font-weight: ${(props: { active: boolean }) =>
    props.active && `${FontWeight.Bold}`};
`;

export default TabTitle;
