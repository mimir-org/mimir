import styled from "styled-components";

interface OffPageBoxProps {
  isSelected: boolean;
  color: string;
}

export const OffPageBox = styled.div<OffPageBoxProps>`
  display: flex;
  position: relative;
  align-items: center;
  z-index: 5 !important;
  bottom: 45px;
  border: 1.5px solid;
  border-radius: 5px;
  border-color: ${(props) => (props.isSelected ? props.color : "transparent")};

  .icon {
    display: flex;
    height: 25px;
    width: 35px;
    top: 3px;
    position: relative;
    pointer-events: none;
  }
`;
