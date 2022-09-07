import React from "react";
import styled, { keyframes } from "styled-components";
import { AnimatedInspectorContainer } from "./AnimatedInspector.styled";

interface Props {
  start: number;
  stop: number;
  run: boolean;
  library?: boolean;
  explorer?: boolean;
  inspectorOpen?: boolean;
  height: number;
  zIndex: number;
  forwardRef: React.MutableRefObject<HTMLDivElement>;
}

const Animation = ({ start, stop, run }: Props) => keyframes`
${!run ? (start = stop) : null}
  from {
    height: ${start}px;
  }
  to {
    height: ${stop}px;
  }  
`;

export const AnimatedInspector = styled((props) => <AnimatedInspectorContainer ref={props.forwardRef} {...props} />)`
  animation: ${Animation} 0.1s ease-in-out;
`;
