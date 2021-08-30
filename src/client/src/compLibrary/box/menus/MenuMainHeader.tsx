import styled from "styled-components";
import { Color } from "../..";

const MenuMainHeader = styled.div`
  position: absolute;
  right: ${(props: { right: string }) => props.right && "2px"};
  left: ${(props: { right: string }) => !props.right && "2px"};
  top: 1px;
  height: 37px;
  padding: 11px 15px 0px 31px;
  cursor: pointer;

  font-weight: ${(props: { isOpen: boolean }) => props.isOpen && "bold"};
  text-decoration: ${(props: { isOpen: boolean }) =>
    props.isOpen && "underline"};
  color: ${(props: { isOpen: boolean }) =>
    props.isOpen ? `${Color.BlueMagenta}` : `${Color.White}`};
  background-color: ${(props: { isOpen: boolean }) =>
    props.isOpen ? `${Color.White}` : `${Color.BlueMagenta}`};

  .text {
    margin-top: 3px;
    margin-left: ${(props) => !props.right && "10px"};
  }

  .icon {
    position: absolute;
    top: 12px;
    left: ${(props) => (props.right ? "5px" : "12px")};
  }
`;

export default MenuMainHeader;
