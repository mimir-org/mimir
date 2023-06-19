import { Button } from "compLibrary/buttons/standard";
import { ButtonBox } from "compLibrary/buttons/ButtonBox";
import { Dropdown } from "compLibrary/dropdown/Dropdown";
import { FontSize } from "assets/font";
import { ImportProjectIcon } from "assets/icons/project";
import { Label } from "compLibrary/input/text";
import { Modal } from "compLibrary/modal/Modal";
import { InfoModalContent } from "compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "assets/text/TextResources";
import { useFilePicker } from "use-file-picker";
import { useState } from "react";
import { commonStateSelector, useAppSelector } from "store";
import { ModuleDescription } from "lib";
import { CommonState } from "store/reducers/commonReducer";

interface ImportProjectDialogProps {
  open: boolean;
  parsers: ModuleDescription[];
  onImportProject: (file: File, parserId: string) => void;
  onExit: () => void;
}

export const ImportProjectDialog = ({ open, parsers, onImportProject, onExit }: ImportProjectDialogProps) => {
  const commonState = useAppSelector<CommonState>(commonStateSelector);
  const [parser, setParser] = useState(parsers?.[0]);

  const hasParser = parser !== null;

  const [openFileSelector, { filesContent, plainFiles, clear }] = useFilePicker({
    multiple: false,
    readAs: "Text",
    accept: [".json", ".nt", ".ttl", ".jsonld"],
    limitFilesConfig: { min: 1, max: 1 },
  });

  const OnImportProjectFileClick = (clear: () => void) => {
    onImportProject(plainFiles[0], parser.id);
    clear();
  };

  const selectedText = plainFiles?.[0]?.name ?? TextResources.PROJECT_IMPORT_SELECT;
  const isActionDisabled = !hasParser || filesContent?.length <= 0 || plainFiles?.length <= 0;

  return (
    <Modal isBlurred isOpen={open} onExit={onExit}>
      <InfoModalContent title={TextResources.PROJECT_IMPORT}>
        <Label>{TextResources.PROJECT_PARSER}</Label>
        <Dropdown
          label=""
          valueProp="name"
          items={commonState?.parsers ?? []}
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
          <Button
            disabled={isActionDisabled}
            onClick={() => OnImportProjectFileClick(clear)}
            text={TextResources.PROJECT_IMPORT}
            icon={ImportProjectIcon}
          />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
