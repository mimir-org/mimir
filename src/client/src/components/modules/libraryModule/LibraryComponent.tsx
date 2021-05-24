import { TextResources } from "../../../assets/textResources";
import { LibCategory } from "../../../models/project";
import { SearchIcon } from "../../../assets/icons";
import { SearchInput } from "../../../componentLibrary";
import { LibraryCategoryComponent } from ".";
import {
  LibraryBody,
  SearchIconBox,
} from "../../../componentLibrary/box/library";

interface Props {
  categories: LibCategory[];
  search: Function;
}

const LibraryComponent = ({ categories, search }: Props) => {
  const onChange = (e: { target: { value: any } }) => {
    search(e.target.value);
  };

  return (
    <>
      <SearchIconBox>
        <img src={SearchIcon} alt="search" className="search-icon" />
      </SearchIconBox>
      <SearchInput
        placeholder={TextResources.Library_SearchBox_Placeholder}
        onChange={onChange}
      />
      <LibraryBody>
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
