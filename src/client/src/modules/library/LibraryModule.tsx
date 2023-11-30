import { useState } from "react";

import { Size } from "assets/size/Size";
import { MODULE_TYPE } from "models/project";
import { ModuleHeader } from "./components/header/ModuleHeader";
import { ModuleBody } from "./components/body/ModuleBody";
import { LibraryTab, CollectionsActions } from "models";
import { BlockLibCm } from "@mimirorg/typelibrary-types";
import { libraryStateSelector, modulesSelector, useAppDispatch, useAppSelector } from "store";
import { Aspect, ModuleType } from "lib";
import { LibraryState } from "store/reducers/libraryReducer";
import { setModule } from "store/reducers/commonReducer";
import { AnimatedModule } from "compLibrary/animated/AnimatedModule";

/**
 * Component for Mimir's type library, templates and subprojects.
 * @param interface
 * @returns a module with tabs and its contents
 */
export const LibraryModule = () => {
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState(LibraryTab.Library);
  const [searchString, setSearchString] = useState("");
  const [collectionState, setCollectionState] = useState(CollectionsActions.ReadOnly);
  const [selectedLibNodes, setSelectedLibNodes] = useState([] as BlockLibCm[]);
  const [selectedLibNode, setSelectedLibNode] = useState<BlockLibCm>(null);
  const [aspectFilters, setAspectFilters] = useState<Aspect[]>([Aspect.Function, Aspect.Product, Aspect.Location]);
  const modules = useAppSelector<ModuleType[]>(modulesSelector);

  const open = modules.some((x) => x === ModuleType.Library);

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
        id="LibraryModule"
        libOpen={open}
        activeTab={activeTab}
        setActiveTab={(tab: LibraryTab) => setActiveTab(tab)}
        search={(text: string) => setSearchString(text)}
        aspectFilters={aspectFilters}
        setAspectFilters={setAspectFilters}
        onOpen={() => dispatch(setModule({ module: ModuleType.Library, open: !open }))}
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
        blocks={libraryState.blockTypes}
      />
    </AnimatedModule>
  );
};
