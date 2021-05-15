import { TextResources } from "../../../assets/textResources";
import { LibCategory } from "../../../models/project";
import { SearchIcon } from "../../../assets/icons";
import { SearchInput } from "../../../componentLibrary";
import { LibraryBody } from "../../../componentLibrary/box/library";
import { LibraryCategoryComponent } from ".";

interface Props {
  categories: LibCategory[];
  search: Function;
}

const LibraryComponent = ({ categories, search }: Props) => {
  const onChange = (e: { target: { value: any } }) => {
    search(e.target.value);
  };

  return (
    <LibraryBody>
      <img src={SearchIcon} alt="search" className="search-icon" />
      <SearchInput
        placeholder={TextResources.Library_SearchBox_Placeholder}
        onChange={onChange}
      />

      {categories &&
        categories.map((category) => {
          return (
            <LibraryCategoryComponent key={category.name} category={category} />
          );
        })}
    </LibraryBody>
  );
};

export default LibraryComponent;
