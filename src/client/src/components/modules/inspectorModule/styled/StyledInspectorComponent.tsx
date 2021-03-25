import styled from "styled-components";

const StyledInspectorComponent = styled.div`
  border: 0px solid #000;
  height: ${(props: { stop: string }) => props.stop}px;
  background-color: #f2f2f2;
  z-index: 5;
`;

export default StyledInspectorComponent;
