import { AspectExpandButtonContainer } from "./styled";
import { CollapseIcon, ExpandIcon } from "../../../assets/icons/chevron";
import { Icon } from "../../../compLibrary/icon";
import { VisuallyHidden } from "../../../compLibrary/util";
import { TextResources } from "../../../assets/text";

interface Props {
  onClick: () => void;
  isExpanded: boolean;
}

const AspectExpandButton = ({ onClick, isExpanded }: Props) => (
  <AspectExpandButtonContainer onClick={onClick}>
    <VisuallyHidden>{isExpanded ? TextResources.Explorer_Close_Group : TextResources.Explorer_Open_Group}</VisuallyHidden>
    <Icon size={10} src={isExpanded ? ExpandIcon : CollapseIcon} alt="" />
  </AspectExpandButtonContainer>
);

export default AspectExpandButton;
