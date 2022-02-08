import { Dispatch } from "redux";
import { AnimatedModule } from "../../compLibrary/animated";
import { Size } from "../../compLibrary/size";
import { MODULE_TYPE } from "../../models/project";
import { ModuleBody, ModuleFooter, ModuleHeader } from ".";
import { Aspect, CollectionsActions, LibraryTab, ObjectType } from "../../models";
import { animatedModuleSelector, libOpenSelector, useAppSelector, useParametricAppSelector } from "../../redux/store";
import { useState } from "react";

interface Props {
  dispatch: Dispatch;
}

/**
 * Component for Mimir's type library, templates and sub-projects
 * @param interface
 * @returns a module with tabs and its contents
 */

const LibraryModule = ({ dispatch }: Props) => {
  const [activeTab, setActiveTab] = useState(LibraryTab.Library);
  const [searchString, setSearchString] = useState("");
  const [collectionState, setCollectionState] = useState(CollectionsActions.ReadOnly);
  const [selectedElement, setSelectedElement] = useState("");
  const [selectedElementType, setSelectedElementType] = useState<ObjectType>(null);
  const [aspectFilters, setAspectFilters] = useState<Aspect[]>([Aspect.Function, Aspect.Product, Aspect.Location]);

  const showFooter = collectionState !== CollectionsActions.Manage;
  const lib = MODULE_TYPE.LIBRARY;
  const animate = useParametricAppSelector(animatedModuleSelector, lib);
  const libOpen = useAppSelector(libOpenSelector);

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
          setCollectionState={setCollectionState}
          selectedElement={selectedElement}
          selectedElementType={selectedElementType}
          onChange={typeEditorOpen}
          dispatch={dispatch}
        />
      )}
    </AnimatedModule>
  );
};

export default LibraryModule;
