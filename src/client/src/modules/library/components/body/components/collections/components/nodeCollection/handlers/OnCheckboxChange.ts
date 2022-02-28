import { LibItem } from "../../../../../../../../../models";

const OnCheckboxChange = (
  item: LibItem,
  selectedTypes: string[],
  setSelectedTypes: (array: string[]) => void,
  isSelected: boolean
) => {
  let temp: string[] = [...selectedTypes];
  if (isSelected) temp = temp.filter((a) => a !== item.id);
  else if (!isSelected && temp) temp.push(item.id);
  setSelectedTypes(temp);
};

export default OnCheckboxChange;
