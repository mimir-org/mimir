import styled from "styled-components";
import { FontWeight } from "../../../compLibrary";

const TabTitle = styled.p`
  position: relative;
  bottom: ${(props) => (props.active ? 20 : 16)}px;
  font-weight: ${(props: { active: boolean }) => props.active && FontWeight.Bold};
  text-align: center;
`;

export default TabTitle;
