import styled from "styled-components";
import { Color } from "../..";

interface Props {
  isOpen: boolean;
}

const MenuMainHeader = styled.div<Props>`
  display: flex;
  float: right;
  margin: 10px 10px 0px 0px;

  .projectName {
    margin-top: 10px;
    color: ${Color.White};
    font-weight: ${(props) => props.isOpen && "bold"};
    margin-left: 30px;
    padding-left: ${(props) => !props.isOpen && 1}px;
    cursor: pointer;
  }

  .icon {
    margin: 3px 0px 0px 10px;
    cursor: pointer;
  }
`;

export default MenuMainHeader;
