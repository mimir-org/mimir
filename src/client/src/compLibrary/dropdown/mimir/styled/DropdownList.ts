import styled from "styled-components";

interface Props {
  top: number;
  borderColor: string;
  borderRadius: number;
}

const DropdownList = styled.div<Props>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${(props) => props.top}px;
  left: 0;
  width: inherit;
  max-height: 250px;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.borderColor};
  border-radius: ${(props) => props.borderRadius}px;
  background-color: inherit;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  z-index: 1;
`;

export default DropdownList;
