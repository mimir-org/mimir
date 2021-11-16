import styled from "styled-components";

interface Props {
  visible: boolean;
}

const ModuleBody = styled.div<Props>`
  float: right;
  width: 331px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  overflow-y: auto;
  overflow-x: hidden;
  height: 89%;
`;

export default ModuleBody;
