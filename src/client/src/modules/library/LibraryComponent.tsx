import { memo, useMemo, useState } from "react";
import { TextResources } from "../../assets/text";
import { SearchIcon } from "../../assets/icons/common";
import { SearchInput } from "../../compLibrary/input/text";
import { LibraryCategoryComponent } from ".";
import { customCategorySelector, legendOpenSelector, librarySelector, useAppSelector } from "../../redux/store";
import { FavoritesBox, LibBody, SearchBox } from "./styled";
import { TypeEditorModule } from "../../typeEditor";
import { Dispatch } from "redux";
import { GetFilteredLibCategories, GetLibCategories } from "./helpers";
import { GetSelectedNode } from "../../helpers";

interface Props {
  search: (text: string) => void;
  searchString: string;
  projectId: string;
  dispatch: Dispatch;
}

const LibraryComponent = ({ search, searchString, projectId, dispatch }: Props) => {
  const [selectedElement, setSelectedElement] = useState("");
  const [selectedElementType, setSelectedElementType] = useState(null);
  const legendOpen = useAppSelector(legendOpenSelector);
  const customCategory = useAppSelector(customCategorySelector);
  const libState = useAppSelector(librarySelector);
  const selectedNode = GetSelectedNode();
  // const subProjects = libState?.subProjectTypes?.filter((x) => x.id !== projectId);

  const libCategories = useMemo(() => GetLibCategories(selectedNode, libState), [selectedNode, libState]);
  const filteredCategories = useMemo(() => GetFilteredLibCategories(libCategories, searchString), [libCategories, searchString]);

  const onChange = (e: { target: { value: any } }) => search(e.target.value);

  const typeEditorOpen = () => {
    setSelectedElement("");
    setSelectedElementType(null);
  };

  return (
    <>
      <SearchBox>
        <SearchInput placeholder={TextResources.Library_SearchBox_Placeholder} onChange={onChange} />
        <img src={SearchIcon} alt="search" className="search-icon" />
      </SearchBox>
      <TypeEditorModule selectedElement={selectedElement} selectedElementType={selectedElementType} onChange={typeEditorOpen} />
      <FavoritesBox>
        <LibraryCategoryComponent
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          setSelectedElementType={setSelectedElementType}
          key={customCategory.name}
          category={customCategory}
          customCategory={customCategory}
          dispatch={dispatch}
        />
      </FavoritesBox>

      <LibBody legend={legendOpen}>
        {filteredCategories?.map((category) => {
          return (
            <LibraryCategoryComponent
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              setSelectedElementType={setSelectedElementType}
              key={category.name}
              category={category}
              customCategory={customCategory}
              dispatch={dispatch}
            />
          );
        })}
        {/* <LibrarySubPageComponent dispatch={dispatch} subProjects={subProjects} /> */}
      </LibBody>
    </>
  );
};

export default memo(LibraryComponent);
