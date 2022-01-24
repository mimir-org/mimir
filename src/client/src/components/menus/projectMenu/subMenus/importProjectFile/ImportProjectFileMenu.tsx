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
import { ModuleDescription } from "../../../../../models";
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
  const [parser, setParser] = useState(parsers[0]);
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.IMPORT_PROJECT_FILE_MENU);
  const onExit = () => OnReturnClick(dispatch);
  const hasParser = parser !== null;

  const [openFileSelector, { filesContent, plainFiles }] = useFilePicker({
    multiple: false,
    readAs: "Text",
    accept: [".json", ".nt"],
    limitFilesConfig: { min: 1, max: 1 },
  });

  const selectedText = plainFiles?.[0]?.name ?? TextResources.Project_Import_Select;
  const data = GetProjectFileData(filesContent, parser);
  const onAction = () => OnProjectSaveClick(dispatch, data);
  const isActionDisabled = !hasParser && filesContent?.length <= 0 || plainFiles?.length <= 0;

  return (
    <Modal title={TextResources.Project_Import} isOpen={isOpen} onExit={onExit}>
      <Label>{TextResources.Project_Parser}</Label>
      <Dropdown
        label=""
        valueProp="name"
        items={parsers}
        keyProp="id"
        fontSize={FontSize.Medium}
        onChange={(item: ModuleDescription) => setParser(item)}
      />
      <Label>{TextResources.Project_Import_File}: {selectedText}</Label>
      <Button onClick={() => openFileSelector()} text={TextResources.Project_Browse} />
      <ButtonBox>
        <Button onClick={onExit} text={TextResources.Project_Cancel} />
        <Button disabled={isActionDisabled} onClick={onAction} text={TextResources.Project_Import} icon={ImportProjectIcon} />
      </ButtonBox>
    </Modal>
  );
};
export default ImportProjectFileMenu;
