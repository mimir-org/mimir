import styled from "styled-components";

const StyledInspectorComponent = styled.div`
  position: fixed;
  margin-bottom: 1px;
  bottom: 0;
  left: 20%;
  right: 20%;
  overflow: hidden;
  border-top: 1px solid #000;
  height: ${(props: { stop: string }) => props.stop}px;
`;

export default StyledInspectorComponent;
