import styled from "styled-components";
import { Size } from "../../../compLibrary/size";
import { Icon } from "../../../compLibrary/icon";

interface Props {
  isOpen: boolean;
}

const LibHeader = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: ${Size.ModuleOpen}px;
  height: 220px;
  border: 0;
  margin: 0;

  /* > span {
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
  } */

  > ${Icon} {
    position: relative;
    margin: ${(props) => !props.isOpen && "24px 0px 0px 10px"};
    transition: left 0.2s ease-in-out;
    cursor: pointer;
  }
`;

export default LibHeader;
