import { Dispatch } from "redux";
import { AnimatedModule } from "../../compLibrary/animated";
import { Size } from "../../compLibrary/size";
import { MODULE_TYPE } from "../../models/project";
import { ModuleHeader, ModuleBody, ModuleFooter } from ".";
import { LibraryTab, CollectionsActions, ObjectType } from "../../models";
import { useAppSelector, useParametricAppSelector, animatedModuleSelector, libOpenSelector } from "../../redux/store";
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
  const [functionSort, setFunctionSort] = useState(true);
  const [productSort, setProductSort] = useState(true);
  const [locationSort, setLocationSort] = useState(true);

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
        functionSort={functionSort}
        productSort={productSort}
        locationSort={locationSort}
        setFunctionSort={(sort: boolean) => setFunctionSort(sort)}
        setProductSort={(sort: boolean) => setProductSort(sort)}
        setLocationSort={(sort: boolean) => setLocationSort(sort)}
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
        functionSort={functionSort}
        productSort={productSort}
        locationSort={locationSort}
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
