import styled from "styled-components";

const StyledInspectorComponent = styled.div`
  width: 100% !important;
  background-color: #e8f5ff !important;
  position: fixed;
  bottom: 0;
  left: 0;
  overflow: hidden;
  border-top: 4px solid grey;
  height: ${(props: { height: string }) => props.height}%;
`;

export default StyledInspectorComponent;
