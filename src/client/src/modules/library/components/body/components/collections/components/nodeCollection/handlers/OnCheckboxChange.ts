import { LibItem } from "../../../../../../../../../models";

const OnCheckboxChange = (
  item: LibItem,
  selectedTypes: LibItem[],
  setSelectedTypes: (array: LibItem[]) => void,
  selected: boolean
) => {
  let temp: LibItem[] = [...selectedTypes];
  if (selected) temp = temp.filter((a) => a !== item);
  else if (!selected && temp) temp.push(item);
  setSelectedTypes(temp);
};

export default OnCheckboxChange;
