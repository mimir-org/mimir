import { Dispatch } from "redux";
import { useState } from "react";
import { AnimatedModule } from "../../compLibrary/animated/AnimatedModule";
import { Size } from "../../compLibrary/size/Size";
import { MODULE_TYPE } from "../../models/project";
import { ModuleHeader } from "./components/header/ModuleHeader";
import { ModuleBody } from "./components/body/ModuleBody";
import { ModuleFooter } from "./components/footer/ModuleFooter";
import { LibraryTab, CollectionsActions, LibItem, Aspect, Node } from "../../models";
import {
  useAppSelector,
  useParametricAppSelector,
  animatedModuleSelector,
  libOpenSelector,
  librarySelector,
} from "../../redux/store";

interface Props {
  nodes: Node[];
  dispatch: Dispatch;
}

/**
 * Component for Mimir's type library, templates and subprojects
 * @param interface
 * @returns a module with tabs and its contents
 */
export const LibraryModule = ({ nodes, dispatch }: Props) => {
  const [activeTab, setActiveTab] = useState(LibraryTab.Library);
  const [searchString, setSearchString] = useState("");
  const [collectionState, setCollectionState] = useState(CollectionsActions.ReadOnly);
  const [selectedTypes, setSelectedTypes] = useState([] as LibItem[]);
  const [selectedElement, setSelectedElement] = useState<LibItem>(null);
  const [aspectFilters, setAspectFilters] = useState<Aspect[]>([Aspect.Function, Aspect.Product, Aspect.Location]);

  const showFooter = collectionState !== CollectionsActions.ManageCollection;
  const lib = MODULE_TYPE.LIBRARY;
  const animate = useParametricAppSelector(animatedModuleSelector, lib);
  const libOpen = useAppSelector(libOpenSelector);
  const collections = useAppSelector(librarySelector).collections;
  const selectedNode = nodes?.find((n) => n.selected);

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
        // collectionState={collectionState}
        // setCollectionState={setCollectionState}
      />
      <ModuleBody
        libOpen={libOpen}
        activeTab={activeTab}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        collectionState={collectionState}
        setCollectionState={setCollectionState}
        searchString={searchString}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        aspectFilters={aspectFilters}
        selectedNode={selectedNode}
      />
      {showFooter && (
        <ModuleFooter
          libOpen={libOpen}
          activeTab={activeTab}
          collectionState={collectionState}
          setCollectionState={setCollectionState}
          selectedElement={selectedElement}
          resetSelectedElement={() => setSelectedElement(null)}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          collections={collections}
          dispatch={dispatch}
        />
      )}
    </AnimatedModule>
  );
};
