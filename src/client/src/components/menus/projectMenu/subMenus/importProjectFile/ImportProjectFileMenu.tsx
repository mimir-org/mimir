import { Button } from "../../../../../compLibrary/buttons";
import { ButtonBox } from "../styled";
import { Dropdown } from "../../../../../compLibrary/dropdown/mimir";
import { FontSize } from "../../../../../compLibrary/font";
import { GetProjectFileData } from "./helpers";
import { ImportProjectIcon } from "../../../../../assets/icons/project";
import { Label } from "../../../../../compLibrary/input/text";
import { MENU_TYPE } from "../../../../../models/project";
import { Modal } from "../../../modal/Modal";
import { TextResources } from "../../../../../assets/text";
import { useFilePicker } from "use-file-picker";
import { useState } from "react";
import { OnProjectSaveClick, OnReturnClick } from "./handlers";
import {
  commonStateParsersSelector,
  isActiveMenuSelector,
  useAppDispatch,
  useAppSelector,
  useParametricAppSelector,
} from "../../../../../redux/store";

export const ImportProjectFileMenu = () => {
  const dispatch = useAppDispatch();
  const parsers = useAppSelector(commonStateParsersSelector);
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.IMPORT_PROJECT_FILE_MENU);
  const onExit = () => OnReturnClick(dispatch);
  const [parser, setParser] = useState(null);
  const hasParser = parser !== null;
  const isActionDisabled = !hasParser;

  const [openFileSelector, { filesContent, plainFiles }] = useFilePicker({
    multiple: false,
    readAs: "Text",
    accept: [".json", ".nt"],
    limitFilesConfig: { min: 1, max: 1 },
  });

  const buttonBrowseText = () => {
    if (plainFiles?.length < 1) return TextResources.Project_Import;
    return plainFiles[0].name;
  };

  const data = GetProjectFileData(filesContent, parser);

  const setButtonAction = () => {
    if (!hasParser) return () => null;
    if (hasParser && !data) return openFileSelector();
    if (hasParser && data) return OnProjectSaveClick(dispatch, data);
  };

  return (
    <Modal title={TextResources.Project_Import} isOpen={isOpen} onExit={onExit}>
      <Label>{TextResources.Project_Parser}</Label>
      <Dropdown
        label=""
        valueProp="name"
        items={parsers}
        keyProp="id"
        fontSize={FontSize.Medium}
        onChange={(item) => setParser(item)}
      />
      <ButtonBox>
        <Button onClick={onExit} text={TextResources.Project_Cancel} />
        <Button disabled={isActionDisabled} onClick={setButtonAction} text={buttonBrowseText()} icon={ImportProjectIcon} />
      </ButtonBox>
    </Modal>
  );
};
export default ImportProjectFileMenu;
