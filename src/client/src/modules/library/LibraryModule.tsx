import { Dispatch } from "redux";
import { useState } from "react";
import { AnimatedModule } from "../../compLibrary/animated/AnimatedModule";
import { Size } from "../../assets/size/Size";
import { MODULE_TYPE } from "../../models/project";
import { ModuleHeader } from "./components/header/ModuleHeader";
import { ModuleBody } from "./components/body/ModuleBody";
import { LibraryTab, CollectionsActions } from "../../models";
import { NodeLibCm } from "@mimirorg/typelibrary-types";
// import { Aspect } from "@mimirorg/modelbuilder-types";
import {
  useAppSelector,
  useParametricAppSelector,
  animatedModuleSelector,
  libOpenSelector,
  // nodesSelector,
  libSubProjectorSelector,
} from "../../redux/store";
import { Aspect } from "../../lib";

interface Props {
  dispatch: Dispatch;
}

/**
 * Component for Mimir's type library, templates and subprojects.
 * @param interface
 * @returns a module with tabs and its contents
 */
export const LibraryModule = ({ dispatch }: Props) => {
  const [activeTab, setActiveTab] = useState(LibraryTab.Library);
  const [searchString, setSearchString] = useState("");
  const [collectionState, setCollectionState] = useState(CollectionsActions.ReadOnly);
  const [selectedLibNodes, setSelectedLibNodes] = useState([] as NodeLibCm[]);
  const [selectedLibNode, setSelectedLibNode] = useState<NodeLibCm>(null);
  const [aspectFilters, setAspectFilters] = useState<Aspect[]>([Aspect.Function, Aspect.Product, Aspect.Location]);
  // const nodes = useAppSelector(nodesSelector);
  const subProjects = useAppSelector(libSubProjectorSelector);
  const lib = MODULE_TYPE.LIBRARY;
  const animate = useParametricAppSelector(animatedModuleSelector, lib);
  const libOpen = useAppSelector(libOpenSelector);
  // const selectedNode = nodes?.find((n) => n.selected);
  // TODO: Fix this
  // const selectedNode = nodes[0];

  const startLib = libOpen ? Size.MODULE_CLOSED : Size.MODULE_OPEN;
  const stopLib = libOpen ? Size.MODULE_OPEN : Size.MODULE_CLOSED;

  return (
    <AnimatedModule start={startLib} stop={stopLib} run={animate} type={lib} id="LibraryModule">
      <ModuleHeader
        libOpen={libOpen}
        dispatch={dispatch}
        activeTab={activeTab}
        setActiveTab={(tab: LibraryTab) => setActiveTab(tab)}
        search={(text: string) => setSearchString(text)}
        aspectFilters={aspectFilters}
        setAspectFilters={setAspectFilters}
      />
      <ModuleBody
        libOpen={libOpen}
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
        subProjects={subProjects}
      />
    </AnimatedModule>
  );
};
