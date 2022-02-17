import { LibraryIcon } from "../../../../../assets/icons/modules";
import { TextResources } from "../../../../../assets/text";
import { Tooltip } from "../../../../../compLibrary/tooltip/Tooltip";
import { LibExpandButton } from "../styled/LibExpandButton";
import { Icon } from "../../../../../compLibrary/icon";
import { OnLibraryClick } from "../handlers/OnLibraryClick";
import { MODULE_TYPE } from "../../../../../models/project";
import { Dispatch } from "redux";

interface Props {
  isOpen: boolean;
  dispatch: Dispatch;
}

export const ExpandButton = ({ isOpen, dispatch }: Props) => (
  <Tooltip content={TextResources.Library_Close_Panel} placement={"bottom"} offset={[0, 10]}>
    <LibExpandButton isOpen onClick={() => OnLibraryClick(dispatch, isOpen, MODULE_TYPE.LIBRARY)}>
      <Icon size={24} src={LibraryIcon} alt="" />
    </LibExpandButton>
  </Tooltip>
);
