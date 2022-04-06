import * as selectors from "./helpers/selectors";
import { Button } from "../../../../../../compLibrary/buttons";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { Dropdown } from "../../../../../../compLibrary/dropdown/mimir/Dropdown";
import { ExportProjectIcon } from "../../../../../../assets/icons/project";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { ModuleDescription } from "../../../../../../models";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { ChangeEvent, useState } from "react";
import { Input, Label } from "../../../../../../compLibrary/input/text";
import { OnReturnClick, OnExportProjectFileClick } from "./handlers";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/store";

export const ExportProjectFileMenu = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(selectors.projectSelector);
  const parsers = useAppSelector(selectors.commonStateParsersSelector);
  const [parser, setParser] = useState(parsers?.[0]);
  const [fileName, setFileName] = useState("");
  const isActionDisabled = !(fileName && parser);
  const onAction = () => OnExportProjectFileClick(dispatch, project, fileName, parser.id);
  const onExit = () => OnReturnClick(dispatch);

  return (
    <Modal isBlurred isOpen onExit={onExit}>
      <InfoModalContent title={TextResources.PROJECT_EXPORT}>
        <Label>{TextResources.FILE_NAME}</Label>
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFileName(e.target.value)}
          inputType="text"
          placeholder={TextResources.FILE_NAME}
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
