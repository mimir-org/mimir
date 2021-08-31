import styled from "styled-components";
import { Color } from "../..";

const MenuMainHeader = styled.div`
  position: absolute;
  right: 2px;
  top: 4px;
  height: 37px;
  padding: 11px 15px 0px 31px;
  cursor: pointer;
  color: ${Color.White};
  background-color: ${Color.BlueMagenta};

  font-weight: ${(props: { isOpen: boolean }) => props.isOpen && "bold"};
  text-decoration: ${(props: { isOpen: boolean }) =>
    props.isOpen && "underline"};

  .projectName {
    margin-top: 3px;
    z-index: 6;
    cursor: pointer;
  }

  .icon {
    position: absolute;
    top: 12px;
    right: 109px;
    z-index: 1;
  }
`;

export default MenuMainHeader;
