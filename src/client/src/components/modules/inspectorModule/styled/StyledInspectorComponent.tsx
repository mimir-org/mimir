import styled from "styled-components";

const StyledInspectorComponent = styled.div`
  margin-bottom: 1px;
  bottom: 0;
  left: 20%;
  right: 20%;
  border: 0px solid #000;
  height: ${(props: { stop: string }) => props.stop}px;
  background-color: #f2f2f2;
  z-index: 5;
`;

export default StyledInspectorComponent;
