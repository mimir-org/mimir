import styled from "styled-components";
import { Color } from "../../";

const MenuTopHeader = styled.div`
  position: absolute;
  right: ${(props: { right: string }) => props.right && "2px"};
  left: ${(props: { right: string }) => !props.right && "2px"};
  top: 2px;
  z-index: 1103;
  width: auto;
  padding: 11px 15px 0px 40px;
  cursor: pointer;

  font-weight: ${(props: { isOpen: boolean }) => props.isOpen && "bold"};
  text-decoration: ${(props: { isOpen: boolean }) =>
    props.isOpen && "underline"};
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
