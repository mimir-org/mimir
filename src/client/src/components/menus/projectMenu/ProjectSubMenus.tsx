import { CommitProjectMenu } from "./subMenus/commitProject";
import { CreateProjectMenu } from "./subMenus/createProject";
import { CreateSubProjectMenu } from "./subMenus/createSubProject";
import { ExportLibraryFileMenu } from "./subMenus/exportLibraryFile";
import { ExportProjectFileMenu } from "./subMenus/exportProjectFile";
import { ImportFileLibraryMenu } from "./subMenus/importLibrary";
import { ImportProjectFileMenu } from "./subMenus/importProjectFile";
import { OpenProjectMenu } from "./subMenus/openProject";

/**
 * Component for all sub-menus in the Mimir project menu.
 * @returns all sub-menus.
 */
const ProjectSubMenus = () => (
  <>
    <OpenProjectMenu />
    <CreateProjectMenu />
    <ExportProjectFileMenu />
    <ImportProjectFileMenu />
    <ExportLibraryFileMenu />
    <ImportFileLibraryMenu />
    <CommitProjectMenu />
    <CreateSubProjectMenu />
  </>
);

export default ProjectSubMenus;
