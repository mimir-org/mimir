import { AspectExpandButtonContainer } from "./AspectExpandButton.styled";
import { CollapseIcon, ExpandIcon } from "../../../../assets/icons/chevron";
import { Icon } from "../../../../compLibrary/icon/Icon";
import { VisuallyHidden } from "../../../../compLibrary/util";
import { TextResources } from "../../../../assets/text/TextResources";

interface Props {
  onClick: () => void;
  isExpanded: boolean;
}

export const AspectExpandButton = ({ onClick, isExpanded }: Props) => (
  <AspectExpandButtonContainer onClick={onClick}>
    <VisuallyHidden>{isExpanded ? TextResources.CLOSE_GROUP : TextResources.OPEN_GROUP}</VisuallyHidden>
    <Icon size={10} src={isExpanded ? ExpandIcon : CollapseIcon} alt="" />
  </AspectExpandButtonContainer>
);
