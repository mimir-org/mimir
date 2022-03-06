import { Button } from "../../../../../../compLibrary/buttons";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { Dropdown } from "../../../../../../compLibrary/dropdown/mimir/Dropdown";
import { ExportProjectIcon } from "../../../../../../assets/icons/project";
import { MENU_TYPE } from "../../../../../../models/project";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { ModuleDescription } from "../../../../../../models";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { ChangeEvent, useState } from "react";
import { Input, Label } from "../../../../../../compLibrary/input/text";
import { OnReturnClick, OnSaveClick } from "./handlers";
import {
  commonStateParsersSelector,
  isActiveMenuSelector,
  projectSelector,
  useAppDispatch,
  useAppSelector,
  useParametricAppSelector,
} from "../../../../../../redux/store";

export const ExportProjectFileMenu = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
  const parsers = useAppSelector(commonStateParsersSelector);
  const [parser, setParser] = useState(parsers[0]);
  const [fileName, setFileName] = useState("");
  const hasParser = parser !== null;
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.SAVE_PROJECT_FILE_MENU);
  const onExit = () => OnReturnClick(dispatch);
  const onAction = () => OnSaveClick(dispatch, project, fileName, parser.id);
  const isActionDisabled = !(fileName && hasParser);

  return (
    <Modal isBlurred isOpen={isOpen} onExit={onExit}>
      <InfoModalContent title={TextResources.PROJECT_EXPORT}>
        <Label>{TextResources.PROJECT_FILE_NAME}</Label>
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFileName(e.target.value)}
          inputType="text"
          placeholder={TextResources.PROJECT_FILE_NAME}
          value={fileName}
        />
        <Label>{TextResources.PROJECT_PARSER}</Label>
        <Dropdown
          label="Parser"
          valueProp="name"
          items={parsers}
          keyProp="id"
          onChange={(item: ModuleDescription) => setParser(item)}
        />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button
            disabled={isActionDisabled}
            onClick={onAction}
            text={TextResources.PROJECT_EXPORT_FILE}
            icon={ExportProjectIcon}
          />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
