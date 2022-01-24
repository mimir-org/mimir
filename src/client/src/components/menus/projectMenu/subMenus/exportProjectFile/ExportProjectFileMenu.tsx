import { Button } from "../../../../../compLibrary/buttons";
import { ButtonBox } from "../styled";
import { Dropdown } from "../../../../../compLibrary/dropdown/mimir";
import { ExportProjectIcon } from "../../../../../assets/icons/project";
import { MENU_TYPE } from "../../../../../models/project";
import { Modal } from "../../../modal/Modal";
import { ModuleDescription } from "../../../../../models";
import { TextResources } from "../../../../../assets/text";
import { useState } from "react";
import { Input, Label } from "../../../../../compLibrary/input/text";
import { OnReturnClick, OnSaveClick } from "./handlers";
import {
  commonStateParsersSelector,
  isActiveMenuSelector,
  projectSelector,
  useAppDispatch,
  useAppSelector,
  useParametricAppSelector,
} from "../../../../../redux/store";

export const ExportProjectFileMenu = () => {
  const dispatch = useAppDispatch();
  const parsers = useAppSelector(commonStateParsersSelector);
  const project = useAppSelector(projectSelector);
  const [fileName, setFileName] = useState("");
  const [parser, setParser] = useState(null);
  const hasParser = parser !== null;
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.SAVE_PROJECT_FILE_MENU);
  const onExit = () => OnReturnClick(dispatch);
  const onAction = () => OnSaveClick(dispatch, project, fileName, parser.id);
  const isActionDisabled = !(fileName && hasParser);

  return (
    <Modal title={TextResources.Project_Export} isOpen={isOpen} onExit={onExit}>
      <Label>{TextResources.Project_File_Name}</Label>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFileName(e.target.value)}
        inputType="text"
        placeholder={TextResources.Project_File_Name}
        value={fileName}
      />
      <Label>{TextResources.Project_Parser}</Label>
      <Dropdown
        label="Parser"
        valueProp="name"
        items={parsers}
        keyProp="id"
        onChange={(item: ModuleDescription) => setParser(item)}
      />
      <ButtonBox>
        <Button onClick={onExit} text={TextResources.Project_Cancel} />
        <Button
          disabled={isActionDisabled}
          onClick={onAction}
          text={TextResources.Project_Export_File}
          icon={ExportProjectIcon}
        />
      </ButtonBox>
    </Modal>
  );
};

export default ExportProjectFileMenu;
