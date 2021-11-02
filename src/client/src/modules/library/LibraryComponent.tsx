import { TextResources } from "../../assets/text";
import { LibraryCategory } from "../../models/project";
import { SearchIcon } from "../../assets/icons/common";
import { SearchInput } from "../../compLibrary";
import { LibraryCategoryComponent } from ".";
import { useState } from "react";
import { customCategorySelector, legendOpenSelector, useAppSelector } from "../../redux/store";
import { LibBody, SearchIconBox } from "../../compLibrary/box/library";
import { TypeEditorModule } from "../../typeEditor";
import { Dispatch } from "redux";

interface Props {
  categories: LibraryCategory[];
  search: (text: string) => void;
  dispatch: Dispatch;
}

const LibraryComponent = ({ categories, search, dispatch }: Props) => {
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
      <SearchIconBox>
        <img src={SearchIcon} alt="search" />
      </SearchIconBox>
      <SearchInput placeholder={TextResources.Library_SearchBox_Placeholder} onChange={onChange} />
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
        <LibraryCategoryComponent
          selectedElement={selectedElement}
          setSelectedElement={setSelectedElement}
          setSelectedElementType={setSelectedElementType}
          key={customCategory.name}
          category={customCategory}
          customCategory={customCategory}
          dispatch={dispatch}
        />
        <TypeEditorModule selectedElement={selectedElement} selectedElementType={selectedElementType} onChange={typeEditorOpen} />
      </LibBody>
    </>
  );
};

export default LibraryComponent;
