import styled from "styled-components";

const ModuleBody = styled.div`
  float: right;
  width: 331px;
  opacity: ${(props: { visible: boolean }) => (props.visible ? 1 : 0)};
  transition: visibility 0.2s ease-in-out, opacity 0.2s ease-in-out;
`;

export default ModuleBody;
