import { ButtonHTMLAttributes, ForwardedRef, forwardRef, isValidElement, ReactElement, ReactNode } from "react";
import { ButtonContainer, Icon } from "./IconButtonStyled";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon: string | ReactElement;
};

/**
 * A Icon Button.
 *
 * @param props Typical button properties.
 * @constructor
 */
export const IconButton = forwardRef((props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  const { icon, ...delegated } = props;

  return (
    <ButtonContainer ref={ref} {...delegated}>
      {isValidElement(icon) ? icon : <Icon src={String(icon)} alt="" />}
    </ButtonContainer>
  );
});

IconButton.displayName = "IconButton";
