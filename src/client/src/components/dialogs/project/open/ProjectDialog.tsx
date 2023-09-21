import { Button } from "compLibrary/buttons/standard";
import { ButtonBox } from "compLibrary/buttons/ButtonBox";
import { Modal } from "compLibrary/modal/Modal";
import { ProjectDetailsComponent } from "./ProjectDetailsComponent";
import { RightArrowIcon } from "assets/icons/arrow";
import { TextResources } from "assets/text/TextResources";
import { InfoModalContent } from "compLibrary/modal/variants/info/InfoModalContent";
import { useState } from "react";
import { ProjectListItem } from "lib";

interface ProjectDialogProps {
  projects: ProjectListItem[];
  open: boolean;
  onOpenProject: (id: string) => void;
  onSearchBarChange: (value: string) => void;
  onExit: () => void;
  onCreateClick: () => void;
  onImportProjectClick: () => void;
}

/**
 * Open project menu component
 * @returns a menu for selecting a project or create a new one.
 */
export const ProjectDialog = ({
  projects,
  open,
  onOpenProject,
  onSearchBarChange,
  onExit,
  onCreateClick,
  onImportProjectClick,
}: ProjectDialogProps) => {
  const [projectList, setProjectList] = useState<ProjectListItem[]>(projects);
  const [searchValue, setSearchValue] = useState<string>(null);

  const onSearch = (value: string) => {
    setSearchValue(value);
    onSearchBarChange(value);
  };
  const OnOpenClick = () => {
    const selectedProject = projectList?.find((x) => x.selected);
    if (selectedProject != null) onOpenProject(selectedProject.id);
  };

  const onProjectItemClick = (id: string) => {
    if (projectList == null) return;
    setProjectList(
      projectList.map((x) => {
        const selected = x.id === id ? true : false;
        return { ...x, selected: selected };
      })
    );
  };

  return (
    <Modal isBlurred isOpen={open} onExit={onExit}>
      <InfoModalContent title={TextResources.PROJECT_OPEN_LABEL}>
        <ProjectDetailsComponent
          projects={projectList}
          projectDescription={projectList?.find((x) => x.selected)?.description}
          onProjectItemClick={onProjectItemClick}
          onSearchBarChange={onSearch}
          searchValue={searchValue}
          onCreateClick={onCreateClick}
          onImportProjectClick={onImportProjectClick}
        />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button
            disabled={projectList?.find((x) => x.selected) == null}
            onClick={OnOpenClick}
            text={TextResources.OPEN}
            icon={RightArrowIcon}
          />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
