import { BlockLibCm } from "@mimirorg/typelibrary-types";

const OnCheckboxChange = (
  item: BlockLibCm,
  selectedTypes: BlockLibCm[],
  setSelectedTypes: (array: BlockLibCm[]) => void,
  selected: boolean
) => {
  let temp: BlockLibCm[] = [...selectedTypes];
  if (selected) temp = temp.filter((a) => a !== item);
  else if (!selected && temp) temp.push(item);
  setSelectedTypes(temp);
};

export default OnCheckboxChange;
