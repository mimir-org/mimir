import GetContent from "./helpers/GetContent";

const FilterContent = () => {
  let section = 0;

  return (
    <>
      {GetContent(2, section++)}
      {GetContent(6, section++)}
      {GetContent(2, section++)}
      {GetContent(1, section++)}
    </>
  );
};

export default FilterContent;
