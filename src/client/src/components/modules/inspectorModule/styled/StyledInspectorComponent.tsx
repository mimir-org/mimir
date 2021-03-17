import styled from "styled-components";

const StyledInspectorComponent = styled.div`
  position: absolute;
  margin-bottom: 1px;
  bottom: 0;
  left: 20%;
  right: 20%;
  overflow: hidden;
  border-top: 1px solid #000;
  height: ${(props: { height: string }) => props.height}%;
`;

export default StyledInspectorComponent;
