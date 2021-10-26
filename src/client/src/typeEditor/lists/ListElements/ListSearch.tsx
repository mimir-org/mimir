import { useState, useEffect } from "react";
import { SearchIcon } from "../../../assets/icons/common";
import { ListSearchBar } from "../../../compLibrary";
import { AttributeType, Rds } from "../../../models";
import { ListType } from "../../TypeEditorList";
import { GetListFilter, CheckIsInArray } from "./helpers";
interface Props {
  listType: ListType;
  placeHolder?: string;
  onChange?: Function;
  list?: Rds[] | AttributeType[];
  setlistItems: any;
}

const ListSearch = ({ listType, placeHolder, list, setlistItems }: Props) => {
  const [searchString, setSearchString] = useState("");
  const filter = GetListFilter(searchString, listType, list);

  const filterListItems = (): Rds[] | AttributeType[] => {
    const isInArray = CheckIsInArray(searchString, listType, list);
    return isInArray ? list : filter;
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
