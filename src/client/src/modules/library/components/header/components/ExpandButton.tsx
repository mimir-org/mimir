import { LibraryIcon } from "../../../../../assets/icons/modules";
import { Tooltip } from "../../../../../compLibrary/tooltip/Tooltip";
import { ExpandButtonContainer } from "./ExpandButton.styled";
import { Icon } from "../../../../../compLibrary/icon/Icon";
import { OnLibraryClick } from "../handlers/OnLibraryClick";
import { MODULE_TYPE } from "../../../../../models/project";
import { Dispatch } from "redux";

interface Props {
  isOpen?: boolean;
  text: string;
  offset: [number, number];
  dispatch: Dispatch;
}

export const ExpandButton = ({ isOpen, text, offset, dispatch }: Props) => (
  <Tooltip content={text} placement={"bottom"} offset={offset}>
    <ExpandButtonContainer isOpen={isOpen} onClick={() => OnLibraryClick(dispatch, isOpen, MODULE_TYPE.LIBRARY)}>
      <Icon size={24} src={LibraryIcon} alt="" />
    </ExpandButtonContainer>
  </Tooltip>
);
