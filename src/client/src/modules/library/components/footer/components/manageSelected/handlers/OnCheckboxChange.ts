const OnCheckboxChange = (
  id: string,
  selected: (id: string) => boolean,
  selectedCollections: string[],
  setSelectedCollections: (select: string[]) => void
) => {
  let temp = [...selectedCollections];
  if (selected(id)) temp = temp.filter((a) => a !== id);
  else if (!selected(id) && temp) temp.push(id);
  setSelectedCollections(temp);
};

export default OnCheckboxChange;
