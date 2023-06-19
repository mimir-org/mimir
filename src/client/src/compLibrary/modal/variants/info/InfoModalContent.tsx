import { FunctionComponent } from "react";
import { Dialog } from "@headlessui/react";
import { Icon } from "../../../icon/Icon";
import {
  InfoModalContentContainer,
  InfoModalHeader,
  InfoModalHeaderDescription,
  InfoModalHeaderTitle,
} from "./InfoModalContent.styled";

interface Props {
  title?: string;
  description?: string;
  color?: string;
  icon?: string;
  children?: React.ReactNode;
}

export const InfoModalContent: FunctionComponent<Props> = ({ title, description, color, icon, children }) => (
  <InfoModalContentContainer color={color}>
    <InfoModalHeader>
      {title && (
        <Dialog.Title as={InfoModalHeaderTitle}>
          {icon && <Icon size={24} src={icon} alt="" />}
          {title}
        </Dialog.Title>
      )}
      {description && <Dialog.Description as={InfoModalHeaderDescription}>{description}</Dialog.Description>}
    </InfoModalHeader>
    {children}
  </InfoModalContentContainer>
);
