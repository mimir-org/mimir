import styled from "styled-components";

const StyledToggleButton = styled.div`
  position: fixed;
  bottom: ${(props: { stop: string }) => props.stop}px;
  right: 20%;
  border-top: 1px solid grey;
  border-left: 1px solid grey;
  margin-bottom: 1px;
  height: 20px;
  font-family: roboto;
  background-color: ${(props: { color: string }) => props.color};
  padding: 5px 10px 5px 10px;
  &: hover {
    cursor: pointer;
  }
`;

export default StyledToggleButton;
