import { TextResources } from "../../assets/text";
import { LibCategory, MODULE_TYPE } from "../../models/project";
import { SearchIcon } from "../../assets/icons/common";
import { SearchInput } from "../../compLibrary";
import { LibraryCategoryComponent } from ".";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { LibraryBody, SearchIconBox } from "../../compLibrary/box/library";
import { TypeEditorModule } from "../../components/modules/typeEditorModule";

interface Props {
  categories: LibCategory[];
  search: Function;
}

const LibraryComponent = ({ categories, search }: Props) => {
  const [selectedElement, setSelectedElement] = useState("");
  const [selectedElementType, setSelectedElementType] = useState(null);

  const isLegendOpen = useSelector<RootState>(
    (state) =>
      state.modules.types.find((x) => x.type === MODULE_TYPE.LEGEND).visible
  ) as boolean;

  const onChange = (e: { target: { value: any } }) => {
    search(e.target.value);
  };

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
              setSelectedElementType={setSelectedElementType}
              key={category.name}
              category={category}
            />
          );
        })}
        <TypeEditorModule
          selectedElement={selectedElement}
          selectedElementType={selectedElementType}
        />
      </LibraryBody>
    </>
  );
};

export default LibraryComponent;
