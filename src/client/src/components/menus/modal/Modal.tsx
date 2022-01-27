import { forwardRef, useEffect, useRef } from "react";
import { CloseIcon } from "../../../assets/icons/close";
import { TextResources } from "../../../assets/text";
import { Icon } from "../../../compLibrary/icon";
import { VisuallyHidden } from "../../../compLibrary/util";
import { ModalContainer, ModalContent, ModalExitButton, ModalHeader, ModalHeaderText } from "./styled";

interface Props {
  isOpen: boolean;
  onExit: () => void;
  title?: string;
  top?: string;
  children: JSX.Element[] | JSX.Element;
}

export const Modal = ({ isOpen, onExit, title, top, children }: Props) => {
  const button = useRef<HTMLButtonElement>(null);
  const ExitButton = CreateExitButton(onExit);

  useEffect(() => {
    isOpen && button.current?.focus();
  }, [isOpen]);

  return (
    isOpen && (
      <ModalContainer top={top}>
        <ModalContent>
          <ModalHeader>
            <ExitButton ref={button} />
            <ModalHeaderText>{title}</ModalHeaderText>
          </ModalHeader>
          {children}
        </ModalContent>
      </ModalContainer>
    )
  );
};

function CreateExitButton(onClick: () => void) {
  const ExitButton = forwardRef<HTMLButtonElement>((props, ref) => (
    <ModalExitButton ref={ref} onClick={() => onClick()}>
      <VisuallyHidden>{TextResources.Modal_Close}</VisuallyHidden>
      <Icon size={10} src={CloseIcon} alt="" />
    </ModalExitButton>
  ));
  ExitButton.displayName = "ExitButton";
  return ExitButton;
}
