import { ExitButtonContainer } from "./ExitButton.styled";
import { VisuallyHidden } from "../../util";
import { CloseIcon } from "../../../assets/icons/close";
import { TextResources } from "../../../assets/text/TextResources";
import { Icon } from "@mimirorg/component-library";

interface Props {
  onClick: () => void;
}

export const ExitButton = ({ onClick }: Props) => (
  <ExitButtonContainer onClick={() => onClick()}>
    <VisuallyHidden>{TextResources.CLOSE_WINDOW}</VisuallyHidden>
    <Icon size={10} src={CloseIcon} alt="" />
  </ExitButtonContainer>
);
