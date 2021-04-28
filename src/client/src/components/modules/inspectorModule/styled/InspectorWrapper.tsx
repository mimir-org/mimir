import styled from "styled-components";

const InspectorWrapper = styled.div`
  border: 0px solid #000;
  height: ${(props: { stop: string }) => props.stop}px;
  background-color: #f2f2f2;
  width: 100%;
  z-index: 5;
  overflow: hidden;
  position: relative;
`;

export default InspectorWrapper;
