import styled, { css } from "styled-components";
import { Color } from "../colors/Color";

interface Props {
  variant?: "horizontal" | "vertical";
}

export const Divider = styled.div<Props>`
  background-color: ${Color.BATTLESHIP_GREY};
  height: 2px;
  width: 100%;
  ${({ variant }) =>
    variant === "vertical" &&
    css`
      width: 2px;
      height: 100%;
    `}
`;

Divider.defaultProps = {
  variant: "horizontal",
};
