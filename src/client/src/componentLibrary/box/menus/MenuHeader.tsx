import styled from "styled-components";
import { Color, FontSize, FontType } from "../../";

const MenuHeader = styled.div`
  position: absolute;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.SubHeader};
  right: ${(props) => (props.right ? "2px" : "inherit")};
  left: ${(props) => (props.right ? "inherit" : "2px")};
  top: 2px;
  z-index: 1103;
  min-width: 155px;
  width: auto;
  text-align: right;
  padding-right: 15px;
  padding-top: 11px;
  cursor: pointer;

  font-weight: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "bold" : "normal"};
  text-decoration: ${(props: { isOpen: boolean }) =>
    props.isOpen ? "underline" : "none"};
  height: ${(props: { isOpen: boolean }) => (props.isOpen ? "45" : "32")}px;
  color: ${(props: { isOpen: boolean }) =>
    props.isOpen ? `${Color.DeepCyan}` : `${Color.White}`};
  background-color: ${(props: { isOpen: boolean }) =>
    props.isOpen ? `${Color.White}` : `${Color.DeepCyan}`};

  .icon {
    position: absolute;
    top: 8px;
    right: 108px;
    z-index: 1103;
  }
`;

export default MenuHeader;
