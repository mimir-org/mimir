import { useState, useEffect } from "react";
import { SearchIcon } from "../../../assets/icons/common";
import { ListSearchBar } from "../../../compLibrary";
import { Rds } from "../../../models";

interface Props {
  placeHolder?: string;
  onChange?: Function;
  list?: any[];
  setlistItems: any;
}

const ListSearch = ({ placeHolder, list, setlistItems }: Props) => {
  const [searchString, setSearchString] = useState("");
  const filter = list?.filter(
    (x) => x.name.match(new RegExp(searchString, "i")) || x.code.match(new RegExp(searchString, "i"))
  );

  const filterListItems = (): Rds[] => {
    const isInArray = list.find((x) => x.name === searchString || x.code === searchString);
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
