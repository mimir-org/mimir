import { isActiveMenuSelector, useParametricAppSelector } from "../../../../../redux/store";
import { ProjectState } from "../../../../../redux/store/project/types";
import { MENU_TYPE } from "../../../../../models/project";
import { CloseIcon } from "../../../../../assets/icons/close";
import { TextResources } from "../../../../../assets/text";
import { useState } from "react";
import { Input, Label } from "../../../../../compLibrary/input/text";
import { Button } from "../../../../../compLibrary/buttons";
import { OnReturnClick, OnSaveClick } from "./handlers";
import { ButtonBox, HeaderBox, InputBox, ProjectBody, ProjectBox } from "../styled";
import { ExportProjectIcon } from "../../../../../assets/icons/project";
import { Dropdown } from "../../../../../compLibrary/dropdown/mimir";
import { ModuleDescription } from "../../../../../models";
import { Dispatch } from "redux";

interface Props {
  projectState: ProjectState;
  dispatch: Dispatch;
  parsers: ModuleDescription[];
}

export const ExportProjectFileMenu = ({ projectState, dispatch, parsers }: Props) => {
  const [fileName, setFileName] = useState("");
  const [parser, setParser] = useState(null);
  const hasParser = parser !== null;
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.SAVE_PROJECT_FILE_MENU);

  return (
    <ProjectBox visible={isOpen}>
      <ProjectBody>
        <HeaderBox>
          <img src={CloseIcon} alt="Close project" onClick={() => OnReturnClick(dispatch)} className="icon" />
          {TextResources.Project_Export}
        </HeaderBox>
        <Label>{TextResources.Project_Parser}</Label>
        <Dropdown
          label="Parser"
          valueProp="name"
          items={parsers}
          keyProp="id"
          onChange={(item: ModuleDescription) => setParser(item)}
        />
        <InputBox>
          <div className="label">{TextResources.Project_File_Name}</div>
          <Input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFileName(e.target.value)}
            inputType="text"
            placeholder={TextResources.Project_File_Name}
            value={fileName}
          />
        </InputBox>
        <ButtonBox left>
          <Button onClick={() => OnReturnClick(dispatch)} text={TextResources.Project_Cancel} />
        </ButtonBox>
        {fileName && hasParser && (
          <ButtonBox>
            <Button
              onClick={() => OnSaveClick(dispatch, projectState, fileName, parser.id)}
              text={TextResources.Project_Export_File}
              icon={ExportProjectIcon}
            />
          </ButtonBox>
        )}
      </ProjectBody>
    </ProjectBox>
  );
};

export default ExportProjectFileMenu;
