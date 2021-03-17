import styled, { keyframes } from "styled-components";
import { StyledInspectorComponent } from "../";

const AnimatedMenuIn = styled(StyledInspectorComponent)`
  animation: 0.4s
    ${keyframes({ from: { height: "0px" }, to: { height: "346px" } })}
    ease-in-out;
`;

export default AnimatedMenuIn;
