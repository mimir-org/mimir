import styled, { keyframes } from "styled-components";
import { StyledToggleButton } from "../";

const AnimatedButtonIn = styled(StyledToggleButton)`
  animation: 0.4s
    ${keyframes({ from: { bottom: "0px" }, to: { bottom: "346px" } })}
    ease-in-out;
`;

export default AnimatedButtonIn;
