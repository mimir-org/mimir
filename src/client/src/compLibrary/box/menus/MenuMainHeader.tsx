import styled from "styled-components";
import { Color } from "../..";

const MenuMainHeader = styled.div`
  display: flex;
  position: absolute;
  right: 2px;
  top: 4px;
  padding: 11px 15px 0px 31px;
  cursor: pointer;
  color: ${Color.White};
  background-color: ${Color.BlueMagenta};
  font-weight: ${(props: { isOpen: boolean }) => props.isOpen && "bold"};

  .projectName {
    display: flex;
    padding-left: 5px;
    margin-top: 3px;
    z-index: 6;
    cursor: pointer;
  }

  .icon {
    display: flex;
    z-index: 1;
    margin-left: 10px;
  }
`;

export default MenuMainHeader;
