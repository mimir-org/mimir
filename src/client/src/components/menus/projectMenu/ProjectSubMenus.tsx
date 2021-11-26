import { CommonState } from "../../../redux/store/common/types";
import { ProjectState } from "../../../redux/store/project/types";
import { CommitProjectMenu } from "./subMenus/commitProject";
import { CreateProjectMenu } from "./subMenus/createProject";
import { CreateSubProjectMenu } from "./subMenus/createSubProject";
import { ExportLibraryFileMenu } from "./subMenus/exportLibraryFile";
import { ExportProjectFileMenu } from "./subMenus/exportProjectFile";
import { ImportFileLibraryMenu } from "./subMenus/importLibrary";
import { ImportProjectFileMenu } from "./subMenus/importProjectFile";
import { OpenProjectMenu } from "./subMenus/openProject";

interface Props {
  projectState: ProjectState;
  commonState: CommonState;
  selectedNodeIds: string[];
  selectedEdgeIds: string[];
  dispatch: any;
}

/**
 * Component for all sub-menus in the Mimir project menu.
 * @param interface
 * @returns all sub-menus.
 */
const ProjectSubMenus = ({ projectState, commonState, selectedNodeIds, selectedEdgeIds, dispatch }: Props) => (
  <>
    <OpenProjectMenu projectState={projectState} dispatch={dispatch} />
    <CreateProjectMenu />
    <ExportProjectFileMenu projectState={projectState} dispatch={dispatch} />
    <ImportProjectFileMenu />
    <ExportLibraryFileMenu />
    <ImportFileLibraryMenu />
    <CommitProjectMenu
      contractors={commonState.contractors}
      parsers={commonState.parsers}
      projectId={projectState?.project?.id}
      disabled={!projectState?.project?.isSubProject}
    />
    <CreateSubProjectMenu
      fromProjectId={projectState?.project?.id}
      nodeIds={selectedNodeIds}
      edgeIds={selectedEdgeIds}
      disabled={!selectedNodeIds}
    />
  </>
);

export default ProjectSubMenus;
