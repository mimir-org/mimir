import { useState } from "react";
import { Checkbox } from "../../compLibrary/input/checkbox/common";
import { SearchInput } from "../../compLibrary/input/text";
import { GetLibrarySearchBoxPlaceholder } from "./helpers";
import { SearchAreaWrapper, SearchFilter, SearchFilterLabel, SearchFilters } from "./styled";
import { Color } from "../../compLibrary/colors";
import { TextResources } from "../../assets/text";
import { LibraryTab } from "../../models";

interface Props {
  activeTab: LibraryTab;
}

const SearchArea = ({ activeTab }: Props) => {
  const [searchString, setSearchString] = useState("");
  const onChange = (e: { target: { value: any } }) => setSearchString(e.target.value);
  const [searchCollections, setSearchCollections] = useState(false);
  const [searchLatest, setSearchLatest] = useState(false);
  const [searchOther, setSearchOther] = useState(false);

  return (
    <SearchAreaWrapper>
      {/* TO DO: REFACTOR and disable(opacity) SearchArea if no collections */}
      <SearchInput placeholder={GetLibrarySearchBoxPlaceholder(activeTab)} onChange={onChange} />
      <SearchFilters>
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
      </SearchFilters>
    </SearchAreaWrapper>
  );
};

export default SearchArea;
