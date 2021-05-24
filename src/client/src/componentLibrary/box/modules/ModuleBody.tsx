import styled from "styled-components";
import { Color } from "./../../../componentLibrary";

const ModuleBody = styled.div`
  float: ${(props) => (props.explorer ? "right" : "left")};
  width: 331px;
  opacity: ${(props: { visible: boolean }) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  position: ${(props) => props.legend && "absolute"};
  bottom: ${(props) => props.legend && "0"};
  height: ${(props) => props.legend && "inherit"};
  border-top: ${(props) => props.legend && `1px solid ${Color.Grey}`};
  margin-bottom: ${(props) => props.legend && "20px"};
  overflow-y: ${(props) => props.legend && "auto"};
  max-height: ${(props) => props.legend && "35%"};
  position: ${(props) => props.legend && "absolute"};
`;

export default ModuleBody;
