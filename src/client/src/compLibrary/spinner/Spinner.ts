import styled, { keyframes, css } from "styled-components";
import { Color } from "../../assets/color/Color";

interface Props {
  variant?: "big" | "small";
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div<Props>`
  width: 100%;
  height: 100%;
  animation: ${spin} 2s linear infinite;
  border-radius: 50%;
  border: 16px solid ${Color.GHOST_WHITE};
  border-top: 16px solid ${Color.BASTILLE};

  ${({ variant }) =>
    variant === "small" &&
    css`
      border: 4px solid ${Color.GHOST_WHITE};
      border-top: 4px solid ${Color.BASTILLE};
    `}
`;

Spinner.defaultProps = {
  variant: "big",
};
