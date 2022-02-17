import { SearchInput } from "../../compLibrary/input/text";
import { GetLibrarySearchBoxPlaceholder } from "./helpers";
import { SearchAreaWrapper } from "./styled"; // SearchFilter, SearchFilterLabel, SearchFilters
import { LibraryTab } from "../../models";
// import { useState } from "react";
// import { Checkbox } from "../../compLibrary/input/checkbox/common";
// import { Color } from "../../compLibrary/colors";
// import { TextResources } from "../../assets/text";

interface Props {
  activeTab: LibraryTab;
  search: (text: string) => void;
}

/**
 * Component for search input and and filters in Library Module
 * @param interface
 * @returns a searchbar and checkboxes for filter options
 */

const SearchArea = ({ activeTab, search }: Props) => {
  // const [searchCollections, setSearchCollections] = useState(false);
  // const [searchLatest, setSearchLatest] = useState(false);
  // const [searchOther, setSearchOther] = useState(false);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => search(e.target.value);

  return (
    <SearchAreaWrapper>
      {/* TO DO: REFACTOR and disable(opacity) SearchArea if no collections */}
      <SearchInput placeholder={GetLibrarySearchBoxPlaceholder(activeTab)} onChange={onChange} />
      {/* <SearchFilters>
        <SearchFilter>
          <Checkbox
            isChecked={searchCollections}
            onChange={() => setSearchCollections(!searchCollections)}
            color={Color.BlueMagenta}
            id={"searchCollection"}
          />
          <SearchFilterLabel>{TextResources.Library_SearchFilter_Collections}</SearchFilterLabel>
        </SearchFilter>
        <SearchFilter>
          <Checkbox
            isChecked={searchLatest}
            onChange={() => setSearchLatest(!searchLatest)}
            color={Color.BlueMagenta}
            id={"searchLatest"}
          />
          <SearchFilterLabel>{TextResources.Library_SearchFilter_Latest_Version}</SearchFilterLabel>
        </SearchFilter>
        <SearchFilter>
          <Checkbox
            isChecked={searchOther}
            onChange={() => setSearchOther(!searchOther)}
            color={Color.BlueMagenta}
            id={"searchOther"}
          />
          <SearchFilterLabel>{TextResources.Library_SearchFilter_Other}</SearchFilterLabel>
        </SearchFilter>
      </SearchFilters> */}
    </SearchAreaWrapper>
  );
};

export default SearchArea;
