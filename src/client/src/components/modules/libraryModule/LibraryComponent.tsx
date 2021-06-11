import { TextResources } from "../../../assets/textResources";
import { LibCategory } from "../../../models/project";
import { SearchIcon } from "../../../assets/icons/common";
import { SearchInput } from "../../../componentLibrary";
import { LibraryCategoryComponent } from ".";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
  LibraryBody,
  SearchIconBox,
} from "../../../componentLibrary/box/library";

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
            <LibraryCategoryComponent key={category.name} category={category} />
          );
        })}
      </LibraryBody>
    </>
  );
};

export default LibraryComponent;
