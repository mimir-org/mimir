import styled from "styled-components";
import { Color } from "./../../../componentLibrary";

const ModuleBody = styled.div`
  float: ${(props) => (props.explorer ? "right" : "left")};
  width: 331px;
  opacity: ${(props: { visible: boolean }) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  position: ${(props) => (props.legend ? "absolute" : "initial")};
  bottom: ${(props) => (props.legend ? "0" : "initial")};
  height: ${(props) => (props.legend ? "600px" : "initial")};
  border-top: ${(props) => (props.legend ? `1px solid ${Color.Grey}` : "0")};
`;

export default ModuleBody;
