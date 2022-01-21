import { Dispatch } from "redux";
import { ModuleFooter, ModuleHeader } from ".";
import { AnimatedModule } from "../../compLibrary/animated";
import { Size } from "../../compLibrary/size";
import { MODULE_TYPE } from "../../models/project";
import { LibraryTab, CollectionsActions, Project } from "../../models";
import { ModuleBody } from "./styled";
import { GetModuleContent } from "./helpers";
import { useAppSelector, useParametricAppSelector, animatedModuleSelector, libOpenSelector } from "../../redux/store";
import { useState } from "react";
interface Props {
  project: Project;
  dispatch: Dispatch;
}

/**
 * Component for Mimir's type library, templates and sub-projects
 * @param interface
 * @returns a module with tabs and its contents
 */

const LibraryModule = ({ dispatch, project }: Props) => {
  const lib = MODULE_TYPE.LIBRARY;
  const animate = useParametricAppSelector(animatedModuleSelector, lib);
  const libOpen = useAppSelector(libOpenSelector);

  const startLib = libOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stopLib = libOpen ? Size.ModuleOpen : Size.ModuleClosed;

  const [activeTab, setActiveTab] = useState(LibraryTab.Library);
  const [collectionState, setCollectionState] = useState(CollectionsActions.NonSelectedAdmin);
  const showFooter = collectionState !== CollectionsActions.Manage;

  return (
    <AnimatedModule start={startLib} stop={stopLib} run={animate} type={lib} id="LibraryModule">
      <ModuleHeader libOpen={libOpen} dispatch={dispatch} activeTab={activeTab} setActiveTab={setActiveTab} project={project} />
      <ModuleBody libOpen={libOpen}>{GetModuleContent(activeTab, collectionState, setCollectionState)}</ModuleBody>
      {showFooter && <ModuleFooter libOpen={libOpen} activeTab={activeTab} setCollectionState={setCollectionState} />}
    </AnimatedModule>
  );
};

export default LibraryModule;
