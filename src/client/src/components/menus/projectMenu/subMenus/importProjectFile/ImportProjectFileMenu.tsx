import { useState } from "react";
import { isActiveMenuSelector, useParametricAppSelector } from "../../../../../redux/store";
import { MENU_TYPE } from "../../../../../models/project";
import { CloseIcon } from "../../../../../assets/icons/close";
import { TextResources } from "../../../../../assets/text";
import { Button } from "../../../../../compLibrary/buttons";
import { useFilePicker } from "use-file-picker";
import { OnProjectSaveClick, OnReturnClick } from "./handlers";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../styled";
import { ImportProjectIcon } from "../../../../../assets/icons/project";
import { GetProjectFileData } from "./helpers";
import { Dropdown } from "../../../../../compLibrary/dropdown/mimir";
import { Label } from "../../../../../compLibrary/input/text";
import { ModuleDescription } from "../../../../../models";

interface Props {
  parsers: ModuleDescription[];
  dispatch: any;
}

export const ImportProjectFileMenu = ({ parsers, dispatch }: Props) => {
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.IMPORT_PROJECT_FILE_MENU);
  const [parser, setParser] = useState(null);
  const hasParser = parser !== null;

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
    if (hasParser && data) return () => OnProjectSaveClick(dispatch, data);
  };

  return (
    <ProjectBox visible={isOpen}>
      <ProjectBody>
        <HeaderBox>
          <img src={CloseIcon} alt="close" onClick={() => OnReturnClick(dispatch)} className="icon" />
          {TextResources.Project_Import}
        </HeaderBox>
        <ButtonBox left>
          <Button onClick={() => OnReturnClick(dispatch)} text={TextResources.Project_Cancel} />
        </ButtonBox>
        <Label>{TextResources.Project_Parser}</Label>
        <Dropdown label="Parser" valueProp="name" items={parsers} keyProp="id" onChange={(e: any) => setParser(e)} />
        <ButtonBox disabled={!hasParser}>
          <Button onClick={setButtonAction} text={buttonBrowseText()} icon={ImportProjectIcon} />
        </ButtonBox>
      </ProjectBody>
    </ProjectBox>
  );
};
export default ImportProjectFileMenu;
