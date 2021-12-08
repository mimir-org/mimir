import styled from "styled-components";

interface Props {
  visible?: boolean | true;
}

const ModuleBody = styled.div<Props>`
  float: right;
  width: 331px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  overflow-x: auto;
  overflow-y: auto;
  height: 87%;
`;

export default ModuleBody;
