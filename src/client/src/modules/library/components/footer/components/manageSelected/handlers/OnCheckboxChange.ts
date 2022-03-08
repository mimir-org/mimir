const OnCheckboxChange = (
  id: string,
  isSelected: (id: string) => boolean,
  selectedCollections: string[],
  setSelectedCollections: (select: string[]) => void
) => {
  let temp = [...selectedCollections];
  if (isSelected(id)) temp = temp.filter((a) => a !== id);
  else if (!isSelected(id) && temp) temp.push(id);
  setSelectedCollections(temp);
};

export default OnCheckboxChange;
