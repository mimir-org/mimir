import styled from "styled-components";
import { Color, FontSize } from "../../../componentLibrary";

const FooterContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 110px;
  height: 38px;
  padding: 0px 10px;
  border: 1px solid ${Color.DeepCyan};
  border-radius: 2px;
  background-color: ${(props) =>
    props.active ? `${Color.DeepCyan}` : `${Color.White}`};
  cursor: pointer;
  color: ${(props) => (props.active ? `${Color.White}` : `${Color.Black}`)};
  font-size: ${FontSize.Standard};
  text-decoration: ${(props) => (props.active ? "underline" : "none")};
  white-space: nowrap;
`;

export default FooterContent;
