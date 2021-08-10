import { TextResources } from "../../../assets/text";
import { TypeMode } from "../../../models";
import { LibCategory, MODULE_TYPE } from "../../../models/project";
import { SearchIcon } from "../../../assets/icons/common";
import { SearchInput } from "../../../compLibrary";
import { LibraryCategoryComponent } from ".";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  changeMode,
  changeSelectedType,
} from "../../../redux/store/typeEditor/actions";
import { LibraryBody, SearchIconBox } from "../../../compLibrary/box/library";
import { TypeEditorModule } from "../../modules/typeEditorModule";

interface Props {
  categories: LibCategory[];
  search: Function;
}

const LibraryComponent = ({ categories, search }: Props) => {
  const dispatch = useDispatch();
  const [selectedElement, setSelectedElement] = useState("");

  const isLegendOpen = useSelector<RootState>(
    (state) =>
      state.modules.types.find((x) => x.type === MODULE_TYPE.LEGEND).visible
  ) as boolean;

  const onChange = (e: { target: { value: any } }) => {
    search(e.target.value);
  };

  const onModeChange = (mode: TypeMode) => {
    // console.log("mode", mode, " selectedType", selectedElement);
    if (selectedElement !== "") {
      dispatch(changeSelectedType(selectedElement));
    }
    dispatch(changeMode(mode));
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
              key={category.name}
              category={category}
            />
          );
        })}
        <TypeEditorModule
          selectedElement={selectedElement}
          onChange={onModeChange}
        />
      </LibraryBody>
    </>
  );
};

export default LibraryComponent;
