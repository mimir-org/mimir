import { memo, useMemo, useState } from "react";
import { TextResources } from "../../assets/text";
import { SearchInput } from "../../compLibrary/input/text";
import { LibraryCategoryComponent } from ".";
import { customCategorySelector, legendOpenSelector, librarySelector, useAppSelector } from "../../redux/store";
import { LibBody } from "./styled";
import { TypeEditorModule } from "../../typeEditor";
import { Dispatch } from "redux";
import { GetFilteredLibCategories, GetLibCategories } from "./helpers";
import { GetSelectedNode } from "../../helpers";
import { LibraryCategory } from "../../models/project";
import { ObjectType } from "../../models";

interface Props {
  search: (text: string) => void;
  searchString: string;
  projectId: string;
  dispatch: Dispatch;
}

const LibraryComponent = ({ search, searchString, dispatch }: Props) => {
  const [selectedElement, setSelectedElement] = useState("");
  const [selectedElementType, setSelectedElementType] = useState<ObjectType>(null);
  const legendOpen = useAppSelector(legendOpenSelector);
  const customCategory = useAppSelector(customCategorySelector);
  const libState = useAppSelector(librarySelector);
  const selectedNode = GetSelectedNode();
  // const subProjects = libState?.subProjectTypes?.filter((x) => x.id !== projectId);

  const libCategories = useMemo(() => GetLibCategories(selectedNode, libState), [selectedNode, libState]);
  const filteredCategories = useMemo(() => GetFilteredLibCategories(libCategories, searchString), [libCategories, searchString]);

  const filterCatBySearch = (): LibraryCategory[] => {
    return searchString ? filteredCategories : libCategories;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => search(e.target.value);

  const typeEditorOpen = () => {
    setSelectedElement("");
    setSelectedElementType(null);
  };

  return (
    <>
      <SearchInput placeholder={TextResources.Library_SearchBox_Placeholder_Library} onChange={onChange} />
      <TypeEditorModule selectedElement={selectedElement} selectedElementType={selectedElementType} onChange={typeEditorOpen} />
      <LibraryCategoryComponent
        selectedElement={selectedElement}
        setSelectedElement={setSelectedElement}
        setSelectedElementType={setSelectedElementType}
        key={customCategory.name}
        category={customCategory}
        customCategory={customCategory}
        dispatch={dispatch}
      />

      <LibBody legend={legendOpen}>
        {filterCatBySearch().map((category) => {
          return (
            <LibraryCategoryComponent
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              setSelectedElementType={setSelectedElementType}
              key={category.name}
              category={category}
              customCategory={customCategory}
              dispatch={dispatch}
              searchList={filteredCategories}
            />
          );
        })}
        {/* <LibrarySubPageComponent dispatch={dispatch} subProjects={subProjects} /> */}
      </LibBody>
    </>
  );
};

export default memo(LibraryComponent);
