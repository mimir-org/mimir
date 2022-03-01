import { CommitProjectMenu } from "./components/subMenus/commitProject/CommitProjectMenu";
import { CreateProjectMenu } from "./components/subMenus/createProject/CreateProjectMenu";
import { CreateSubProjectMenu } from "./components/subMenus/createSubProject/CreateSubProjectMenu";
import { ExportLibraryFileMenu } from "./components/subMenus/exportLibraryFile/ExportLibraryFileMenu";
import { ExportProjectFileMenu } from "./components/subMenus/exportProjectFile/ExportProjectFileMenu";
import { ImportFileLibraryMenu } from "./components/subMenus/importLibrary/ImportFileLibraryMenu";
import { ImportProjectFileMenu } from "./components/subMenus/importProjectFile/ImportProjectFileMenu";
import { OpenProjectMenu } from "./components/subMenus/openProject/OpenProjectMenu";

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
