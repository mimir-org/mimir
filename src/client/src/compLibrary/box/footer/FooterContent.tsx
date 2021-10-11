import styled from "styled-components";
import { Color, FontSize } from "../../../compLibrary";

const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 110px;
  height: 38px;
  padding: 0px 10px;
  border: 1px solid ${Color.BlueMagenta};
  border-radius: 2px;
  background-color: ${(props: { active: boolean }) => (props.active ? Color.BlueMagenta : Color.White)};
  cursor: pointer;
  color: ${(props: { active: boolean }) => (props.active ? Color.White : Color.Black)};
  font-size: ${FontSize.Standard};
  text-decoration: ${(props: { active: boolean }) => props.active && "underline"};
  white-space: nowrap;
`;

export default FooterContent;
