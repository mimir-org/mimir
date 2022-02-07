import styled from "styled-components";

interface Props {
  isSelected: boolean;
  color: string;
}

const OffPageBox = styled.div<Props>`
  display: flex;
  position: relative;
  align-items: center;
  z-index: 5 !important;
  bottom: 31px;
  border: 1.5px solid;
  border-radius: 5px;
  border-color: ${(props) => (props.isSelected ? props.color : "transparent")};

  .logo {
    display: flex;
    height: 25px;
    width: 35px;
    top: 3px;
    position: relative;
    pointer-events: none;
  }
`;

export default OffPageBox;
