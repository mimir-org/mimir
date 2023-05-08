import { useState } from "react";
import { AnimatedModule } from "../../compLibrary/animated/AnimatedModule";
import { Size } from "../../assets/size/Size";
import { MODULE_TYPE } from "../../models/project";
import { ModuleHeader } from "./components/header/ModuleHeader";
import { ModuleBody } from "./components/body/ModuleBody";
import { LibraryTab, CollectionsActions } from "../../models";
import { AspectObjectLibCm } from "@mimirorg/typelibrary-types";
import { libraryStateSelector, useAppSelector } from "store";
import { Aspect } from "../../lib";
import { LibraryState } from "store/reducers/libraryReducer";

/**
 * Component for Mimir's type library, templates and subprojects.
 * @param interface
 * @returns a module with tabs and its contents
 */
export const LibraryModule = () => {
  const [open, setOpen] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState(LibraryTab.Library);
  const [searchString, setSearchString] = useState("");
  const [collectionState, setCollectionState] = useState(CollectionsActions.ReadOnly);
  const [selectedLibNodes, setSelectedLibNodes] = useState([] as AspectObjectLibCm[]);
  const [selectedLibNode, setSelectedLibNode] = useState<AspectObjectLibCm>(null);
  const [aspectFilters, setAspectFilters] = useState<Aspect[]>([Aspect.Function, Aspect.Product, Aspect.Location]);
  const libraryState = useAppSelector<LibraryState>(libraryStateSelector);
  const lib = MODULE_TYPE.LIBRARY;

  // const selectedNode = nodes?.find((n) => n.selected);
  // TODO: Fix this
  // const selectedNode = nodes[0];

  return (
    <AnimatedModule
      start={open ? Size.MODULE_CLOSED : Size.MODULE_OPEN}
      stop={open ? Size.MODULE_OPEN : Size.MODULE_CLOSED}
      run={open}
      type={lib}
      id="LibraryModule"
    >
      <ModuleHeader
        libOpen={open}
        activeTab={activeTab}
        setActiveTab={(tab: LibraryTab) => setActiveTab(tab)}
        search={(text: string) => setSearchString(text)}
        aspectFilters={aspectFilters}
        setAspectFilters={setAspectFilters}
        onOpen={setOpen}
      />
      <ModuleBody
        libOpen={open}
        activeTab={activeTab}
        selectedLibNodes={selectedLibNodes}
        setSelectedLibNodes={setSelectedLibNodes}
        collectionState={collectionState}
        setCollectionState={setCollectionState}
        searchString={searchString}
        selectedLibNode={selectedLibNode}
        setSelectedLibNode={setSelectedLibNode}
        aspectFilters={aspectFilters}
        selectedNode={null} // TODO: Fix this
        subProjects={libraryState.subProjects}
      />
    </AnimatedModule>
  );
};
