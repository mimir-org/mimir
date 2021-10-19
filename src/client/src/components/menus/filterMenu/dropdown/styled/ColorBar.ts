import styled from "styled-components";

interface Props {
  color: string;
}

const ColorBar = styled.div<Props>`
  background-color: ${(props) => props.color};
  width: 14px;
  height: 32px;
  position: relative;
  left: 35px;
  margin-right: 10px;
`;

export default ColorBar;
