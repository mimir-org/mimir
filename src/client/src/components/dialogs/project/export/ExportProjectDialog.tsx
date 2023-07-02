import { Button } from "compLibrary/buttons/standard";
import { ButtonBox } from "compLibrary/buttons/ButtonBox";
import { Dropdown } from "compLibrary/dropdown/Dropdown";
import { ExportProjectIcon } from "assets/icons/project";
import { Modal } from "compLibrary/modal/Modal";
import { InfoModalContent } from "compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "assets/text/TextResources";
import { ChangeEvent, useState } from "react";
import { Input, Label } from "compLibrary/input/text";
import { ModuleDescription } from "lib";

interface Parser {
  id: string;
  name: string;
}

interface ExportProjectDialogProps {
  open: boolean;
  parsers: Parser[];
  onExportProjectFileClick: (fileName: string, parserId: string) => void;
  onExit: () => void;
}

export const ExportProjectDialog = ({ open, parsers, onExportProjectFileClick, onExit }: ExportProjectDialogProps) => {
  const [parser, setParser] = useState(parsers?.[0]);
  const [fileName, setFileName] = useState("");

  return (
    <Modal isBlurred isOpen={open} onExit={onExit}>
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
          items={parsers ?? []}
          keyProp="id"
          onChange={(item: ModuleDescription) => setParser(item)}
        />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button
            disabled={!(fileName && parser)}
            onClick={() => onExportProjectFileClick(fileName, parser.id)}
            text={TextResources.PROJECT_EXPORT_FILE}
            icon={ExportProjectIcon}
          />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
