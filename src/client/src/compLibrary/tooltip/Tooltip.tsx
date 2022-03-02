import { ReactElement, ReactNode, RefObject } from "react";
import { TippyProps } from "@tippyjs/react";
import { TooltipContainer } from "./Tooltip.styled";

interface Props {
  content: ReactNode;
  disabled?: boolean;
  delay?: number;
  offset?: [number, number];
  placement?: TippyProps["placement"];
  reference?: Element | RefObject<Element>;
  children?: ReactElement;
}

/**
 * Component for a generic Tooltip in Mimir.
 * @param interface
 * @see https://github.com/atomiks/tippyjs-react
 * @returns a dynamically placed tooltip.
 */
export const Tooltip = ({ content, placement, delay, offset, disabled, reference, children }: Props) => (
  <TooltipContainer
    content={content}
    placement={placement}
    delay={delay}
    offset={offset}
    disabled={disabled}
    reference={reference}
  >
    {children}
  </TooltipContainer>
);
