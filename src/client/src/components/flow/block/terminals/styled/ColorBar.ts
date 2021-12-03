import styled from "styled-components";

interface Props {
  color: string;
}

const ColorBar = styled.div<Props>`
  background-color: ${(props) => props.color};
  width: 12px;
  height: 26px;
  position: relative;
  bottom: 5.5px;
  left: 30px;
`;

export default ColorBar;
