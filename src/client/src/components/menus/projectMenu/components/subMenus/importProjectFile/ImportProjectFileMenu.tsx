import * as selectors from "./helpers/selectors";
import { Button } from "../../../../../../compLibrary/buttons/standard";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { Dropdown } from "../../../../../../compLibrary/dropdown/mimir/Dropdown";
import { FontSize } from "../../../../../../assets/font";
import { ImportProjectIcon } from "../../../../../../assets/icons/project";
import { Label } from "../../../../../../compLibrary/input/text";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { useFilePicker } from "use-file-picker";
import { useState } from "react";
import { OnImportProjectFileClick, OnReturnClick } from "./handlers";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/store";
import { ModuleDescription } from "lib";

export const ImportProjectFileMenu = () => {
  const dispatch = useAppDispatch();
  const parsers = useAppSelector(selectors.commonStateParsersSelector);
  const [parser, setParser] = useState(parsers?.[0]);
  const onExit = () => OnReturnClick(dispatch);
  const hasParser = parser !== null;

  const [openFileSelector, { filesContent, plainFiles, clear }] = useFilePicker({
    multiple: false,
    readAs: "Text",
    accept: [".json", ".nt", ".ttl", ".jsonld"],
    limitFilesConfig: { min: 1, max: 1 },
  });

  const selectedText = plainFiles?.[0]?.name ?? TextResources.PROJECT_IMPORT_SELECT;
  const onAction = () => OnImportProjectFileClick(clear, dispatch, plainFiles[0], parser.id);
  const isActionDisabled = !hasParser || filesContent?.length <= 0 || plainFiles?.length <= 0;

  return (
    <Modal isBlurred isOpen onExit={onExit}>
      <InfoModalContent title={TextResources.PROJECT_IMPORT}>
        <Label>{TextResources.PROJECT_PARSER}</Label>
        <Dropdown
          label=""
          valueProp="name"
          items={parsers}
          keyProp="id"
          fontSize={FontSize.MEDIUM}
          onChange={(item: ModuleDescription) => setParser(item)}
        />
        <Label>
          {TextResources.PROJECT_IMPORT_FILE}: {selectedText}
        </Label>
        <Button onClick={() => openFileSelector()} text={TextResources.BROWSE} />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button disabled={isActionDisabled} onClick={onAction} text={TextResources.PROJECT_IMPORT} icon={ImportProjectIcon} />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
