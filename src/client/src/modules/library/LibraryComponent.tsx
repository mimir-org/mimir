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
  const type = MODULE_TYPE.LEGEND;
  const legendOpen = useSelector<RootState>((s) => s.modules.types.find((x) => x.type === type).visible) as boolean;

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
      <LibraryBody legend={legendOpen}>
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
      </LibraryBody>
    </>
  );
};

export default LibraryComponent;
