import styled from "styled-components";

const ModuleBody = styled.div`
  float: ${(props) => (props.explorer ? "right" : "left")};
  width: 331px;
  max-height: ${(props) => props.legend && "265px"};
  opacity: ${(props: { visible: boolean }) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  bottom: ${(props) => props.legend && "0"};
  overflow-y: ${(props) => props.legend && "auto"};
  overflow-x: hidden;
`;

export default ModuleBody;
