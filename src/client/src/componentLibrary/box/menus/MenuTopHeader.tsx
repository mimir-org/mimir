import styled from "styled-components";
import { Color, FontType } from "../../";

const MenuTopHeader = styled.div`
  position: absolute;
  font-family: ${FontType.Standard};
  right: ${(props: { right: string }) => (props.right ? "2px" : "inherit")};
  left: ${(props: { right: string }) => (props.right ? "inherit" : "2px")};
  top: 2px;
  z-index: 1103;
  width: auto;
  padding: 11px 15px 0px 40px;
  cursor: pointer;

  font-weight: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "bold" : "normal"};
  text-decoration: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "underline" : "none"};
  height: ${(props: { isOpen: boolean }) => (props.isOpen ? "35" : "32")}px;
  color: ${(props: { isOpen: boolean }) =>
    props.isOpen ? `${Color.DeepCyan}` : `${Color.White}`};
  background-color: ${(props: { isOpen: boolean }) =>
    props.isOpen ? `${Color.White}` : `${Color.DeepCyan}`};

  .icon {
    position: absolute;
    top: 8px;
    left: 12px;
    z-index: 1103;
  }
`;

export default MenuTopHeader;
