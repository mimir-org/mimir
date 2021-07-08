import { TextResources } from "../../../assets/text";
import { LibCategory } from "../../../models/project";
import { SearchIcon } from "../../../assets/icons/common";
import { SearchInput } from "../../../compLibrary";
import { LibraryCategoryComponent } from ".";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { LibraryBody, SearchIconBox } from "../../../compLibrary/box/library";
import { TypeEditorModule } from "../../modules/typeEditorModule";

interface Props {
  categories: LibCategory[];
  search: Function;
}

const LibraryComponent = ({ categories, search }: Props) => {
  const isLegendOpen = useSelector<RootState>(
    (state) => state.modules.types.find((x) => x.type === "Legend").visible
  ) as boolean;

  const onChange = (e: { target: { value: any } }) => {
    search(e.target.value);
  };

  const [selectedElement, setSelectedElement] = useState("");

  return (
    <>
      <SearchIconBox>
        <img src={SearchIcon} alt="search" />
      </SearchIconBox>
      <SearchInput
        placeholder={TextResources.Library_SearchBox_Placeholder}
        onChange={onChange}
      />
      <LibraryBody legend={isLegendOpen}>
        {categories?.map((category) => {
          return (
            <LibraryCategoryComponent
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              key={category.name}
              category={category}
            />
          );
        })}
        <TypeEditorModule selectedElement={selectedElement} />
      </LibraryBody>
    </>
  );
};

export default LibraryComponent;
