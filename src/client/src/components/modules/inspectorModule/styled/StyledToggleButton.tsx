import styled from "styled-components";

const StyledToggleButton = styled.div`
  position: absolute;
  bottom: ${(props: { height: string }) => props.height}%;
  right: 0%;
  border: 1px solid grey;
  width: auto;
  height: 20px;
  font-family: roboto;
  background-color: ${(props: { color: string }) => props.color};
  padding: 5px 10px 5px 10px;
  &: hover {
    cursor: pointer;
  }
`;

export default StyledToggleButton;
