import { TextResources } from "../../assets/text";
import { LibraryCategory } from "../../models/project";
import { SearchIcon } from "../../assets/icons/common";
import { SearchInput } from "../../compLibrary";
import { LibraryCategoryComponent } from ".";
import { useState } from "react";
import { isLegendOpenSelector, useAppSelector } from "../../redux/store";
import { LibBody, SearchIconBox } from "../../compLibrary/box/library";
import { TypeEditorModule } from "../../typeEditor";

interface Props {
  categories: LibraryCategory[];
  search: Function;
}

const LibraryComponent = ({ categories, search }: Props) => {
  const [selectedElement, setSelectedElement] = useState("");
  const [selectedElementType, setSelectedElementType] = useState(null);
  const legendOpen = useAppSelector(isLegendOpenSelector);

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
            />
          );
        })}
        <TypeEditorModule
          selectedElement={selectedElement}
          selectedElementType={selectedElementType}
          onChange={typeEditorOpen}
        />
      </LibBody>
    </>
  );
};

export default LibraryComponent;
