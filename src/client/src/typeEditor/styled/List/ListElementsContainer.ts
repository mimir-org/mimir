import styled from "styled-components";
import { Color } from "../../../compLibrary/colors/Color";

interface Props {
  background?: boolean;
  hover?: boolean;
  switchBackground?: boolean;
}

const ListElementsContainer = styled.div<Props>`
  position: relative;
  height: 100%;
  border-bottom: 1px solid ${Color.BLACK};
  overflow-x: hidden;
  overflow-y: scroll;
  overflow-y: overlay;

  div:nth-child(odd) {
    background-color: ${(props) => props.background && Color.LAVANDER_WEB_LIST};
    background-color: ${(props) => props.switchBackground && Color.WHITE};
  }

  div:nth-child(even) {
    background-color: ${(props) => props.background && Color.WHITE};
    background-color: ${(props) => props.switchBackground && Color.LAVANDER_WEB_LIST};
  }

  div:nth-child(n):hover {
    background-color: ${(props) => !props.hover && Color.LAVANDER_WEB_HOVER};
  }

  :before {
    content: "";
    width: 1px;
    height: 5px;
    background: ${Color.BASTILLE};
    border-radius: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  :after {
    content: "";
    width: 1px;
    height: 5px;
    background: ${Color.BASTILLE};
    border-radius: 1px;
    position: absolute;
    bottom: 0;
    right: 0;
  }
`;

export default ListElementsContainer;
