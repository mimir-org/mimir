import styled from "styled-components";

const StyledToggleButton = styled.div`
  position: fixed;
  bottom: ${(props: { stop: string }) => props.stop}px;
  right: 20%;
  border-top: 1px solid grey;
  border-left: 1px solid grey;
  border-right: 1px solid #000;
  margin-bottom: 1px;
  height: 20px;
  font-family: roboto;
  background-color: ${(props: { color: string }) => props.color};
  padding: 5px 10px 5px 10px;
  transition: font-weight 0.5s, background-color 0.5s;
  &: hover {
    cursor: pointer;
    font-weight: bold;
    background-color: #e8f5ff;
  }
`;

export default StyledToggleButton;
