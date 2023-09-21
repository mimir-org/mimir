import { css } from "styled-components";

/**
 * Focus styles without pseudo-class wrapper
 */
export const focusRaw = css`
  outline: 1px solid black;
  outline-offset: 1px;
`;

/**
 * Common focus style for several components.
 * Uses :focus-visible as pseudo-class.
 */
export const focus = css`
  :focus-visible {
    ${focusRaw};
  }
`;
