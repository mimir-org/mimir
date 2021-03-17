import styled, { keyframes } from "styled-components";
import { StyledToggleButton } from "../";

const AnimatedButtonIn = styled(StyledToggleButton)`
  animation: 0.4s
    ${keyframes({ from: { bottom: "346px" }, to: { bottom: "0px" } })}
    ease-in-out;
`;

export default AnimatedButtonIn;
