import { Dispatch } from "redux";
import { useState } from "react";
import { AnimatedModule } from "../../compLibrary/animated";
import { Size } from "../../compLibrary/size";
import { MODULE_TYPE } from "../../models/project";
import { ModuleHeader } from "./components/header/ModuleHeader";
import { ModuleBody } from "./components/body/ModuleBody";
import { ModuleFooter } from "./components/footer/ModuleFooter";
import { LibraryTab, CollectionsActions, ObjectType, LibItem, Aspect } from "../../models";
import {
  useAppSelector,
  useParametricAppSelector,
  animatedModuleSelector,
  libOpenSelector,
  librarySelector,
} from "../../redux/store";

interface Props {
  dispatch: Dispatch;
}

/**
 * Component for Mimir's type library, templates and subprojects
 * @param interface
 * @returns a module with tabs and its contents
 */

export const LibraryModule = ({ dispatch }: Props) => {
  const [activeTab, setActiveTab] = useState(LibraryTab.Library);
  const [searchString, setSearchString] = useState("");
  const [collectionState, setCollectionState] = useState(CollectionsActions.ReadOnly);
  const [selectedTypes, setSelectedTypes] = useState([] as LibItem[]);
  const [selectedElement, setSelectedElement] = useState("");
  const [selectedElementType, setSelectedElementType] = useState<ObjectType>(null);
  const [aspectFilters, setAspectFilters] = useState<Aspect[]>([Aspect.Function, Aspect.Product, Aspect.Location]);

  const showFooter = collectionState !== CollectionsActions.ManageCollection;
  const lib = MODULE_TYPE.LIBRARY;
  const animate = useParametricAppSelector(animatedModuleSelector, lib);
  const libOpen = useAppSelector(libOpenSelector);
  const collections = useAppSelector(librarySelector).collections;

  const startLib = libOpen ? Size.ModuleClosed : Size.ModuleOpen;
  const stopLib = libOpen ? Size.ModuleOpen : Size.ModuleClosed;

  const typeEditorOpen = () => {
    setSelectedElement("");
    setSelectedElementType(null);
  };

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
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        collectionState={collectionState}
        setCollectionState={setCollectionState}
        searchString={searchString}
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        setSelectedElementType={setSelectedElementType}
        aspectFilters={aspectFilters}
      />
      {showFooter && (
        <ModuleFooter
          libOpen={libOpen}
          activeTab={activeTab}
          collectionState={collectionState}
          setCollectionState={setCollectionState}
          selectedElement={selectedElement}
          selectedElementType={selectedElementType}
          selectedTypes={selectedTypes}
          setSelectedTypes={setSelectedTypes}
          collections={collections}
          onChange={typeEditorOpen}
          dispatch={dispatch}
        />
      )}
    </AnimatedModule>
  );
};
