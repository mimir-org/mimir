import { useState, useEffect } from "react";
import { ListSearchBar } from "../../compLibrary";
import { SearchIcon } from "../../assets/icons/common";
import { ListType } from "../TypeEditorList";
import { GetListFilter } from "./ListElements/helpers";
import { Rds, AttributeType, CompositeType, PredefinedAttribute, TerminalTypeDict } from "../../models";

interface Props {
  listType: ListType;
  placeHolder: string;
  list: Rds[] | TerminalTypeDict | AttributeType[] | CompositeType[] | PredefinedAttribute[];
  setlistItems: any;
}
/**Searchbar component at the top of a list that filter the elements in the list
 * @returns a visual searchbar
 */

const ListSearch = ({ listType, placeHolder, list, setlistItems }: Props) => {
  const [searchString, setSearchString] = useState("");

  const filterListItems = (): Rds[] | TerminalTypeDict | AttributeType[] | CompositeType[] | PredefinedAttribute[] => {
    return searchString ? GetListFilter(searchString, listType, list) : list;
  };

  useEffect(() => {
    list && setlistItems(filterListItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  return (
    <ListSearchBar>
      <label htmlFor="listSearch" />
      <input
        type="text"
        value={searchString}
        placeholder={placeHolder ?? ""}
        onChange={(e: any) => setSearchString(e.target.value)}
      />
      <img src={SearchIcon} alt="search-icon" className="icon" />
    </ListSearchBar>
  );
};

export default ListSearch;
