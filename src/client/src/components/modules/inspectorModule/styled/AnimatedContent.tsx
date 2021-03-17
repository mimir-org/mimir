import styled, { keyframes } from "styled-components";
import StyledInspectorComponent from "./StyledInspectorComponent";

const AnimatedComponent = styled(StyledInspectorComponent)`
  animation: 0.4s
    ${keyframes({ from: { height: "346px" }, to: { height: "0px" } })}
    ease-in-out;
`;

export default AnimatedComponent;
