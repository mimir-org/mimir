import { useState } from "react";
import { TextResources } from "../../assets/text";
import { LibraryCategory } from "../../models/project";
import { SearchIcon } from "../../assets/icons/common";
import { SearchInput } from "../../compLibrary/input/text";
import { LibraryCategoryComponent, LibrarySubPageComponent } from ".";
import { customCategorySelector, legendOpenSelector, useAppSelector } from "../../redux/store";
import { FavoritesBox, LibBody, SearchBox } from "./styled";
import { TypeEditorModule } from "../../typeEditor";
import { Dispatch } from "redux";
import { LibrarySubProjectItem } from "../../models";

interface Props {
  categories: LibraryCategory[];
  search: (text: string) => void;
  dispatch: Dispatch;
  subProjects?: LibrarySubProjectItem[];
}

const LibraryComponent = ({ categories, search, dispatch, subProjects }: Props) => {
  const [selectedElement, setSelectedElement] = useState("");
  const [selectedElementType, setSelectedElementType] = useState(null);
  const legendOpen = useAppSelector(legendOpenSelector);
  const customCategory = useAppSelector(customCategorySelector);

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
        {categories?.map((category) => {
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
        <LibrarySubPageComponent dispatch={dispatch} subProjects={subProjects} />
      </LibBody>
    </>
  );
};

export default LibraryComponent;
