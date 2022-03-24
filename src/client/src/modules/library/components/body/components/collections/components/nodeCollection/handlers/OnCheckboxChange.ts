import { LibItem } from "../../../../../../../../../models";

const OnCheckboxChange = (
  item: LibItem,
  selectedTypes: LibItem[],
  setSelectedTypes: (array: LibItem[]) => void,
  isSelected: boolean
) => {
  let temp: LibItem[] = [...selectedTypes];
  if (isSelected) temp = temp.filter((a) => a !== item);
  else if (!isSelected && temp) temp.push(item);
  setSelectedTypes(temp);
};

export default OnCheckboxChange;
