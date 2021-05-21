import styled from "styled-components";
import { Color } from "./../../../componentLibrary";

const ModuleBody = styled.div`
  float: ${(props) => (props.explorer ? "right" : "left")};
  width: 331px;
  opacity: ${(props: { visible: boolean }) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  position: ${(props) => (props.legend ? "absolute" : "initial")};
  bottom: ${(props) => (props.legend ? "0" : "initial")};
  height: ${(props) => (props.legend ? "inherit" : "initial")};
  border-top: ${(props) => (props.legend ? `1px solid ${Color.Grey}` : "0")};
  margin-bottom: ${(props) => (props.legend ? "20px" : "0")};
  overflow-y: ${(props) => (props.legend ? "auto" : "none")};
  max-height: ${(props) => (props.legend ? "35%" : "none")}; // TODO fix
  position: ${(props) => (props.legend ? "absolute" : "initial")};
`;

export default ModuleBody;
