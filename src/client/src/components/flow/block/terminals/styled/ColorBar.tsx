import styled from "styled-components";

const ColorBar = styled.div`
  background-color: ${(props: { color: string }) => props.color};
  width: 20px;
  height: 26px;
  position: relative;
  bottom: 5.5px;
  left: 30px;
`;

export default ColorBar;
