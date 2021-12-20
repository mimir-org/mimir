import styled from "styled-components";
import { Size } from "../../../compLibrary/size";
import { Icon } from "../../../compLibrary/icon";

interface Props {
  isOpen: boolean;
}

const LibHeader = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: ${Size.ModuleOpen}px;
  padding: 25px 0 20px 0;

  background: transparent;
  border: 0;
  margin: 0;
  font: inherit;
  cursor: inherit;

  > span {
    opacity: ${(props) => (props.isOpen ? 1 : 0)};
    transition: opacity 0.2s ease-in-out;
  }

  > ${Icon} {
    position: relative;
    left: ${(props) => !props.isOpen && "32px"};
    transition: left 0.2s ease-in-out;
  }
`;

export default LibHeader;
