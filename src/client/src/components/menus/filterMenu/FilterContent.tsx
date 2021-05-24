import GetContent from "./helpers/GetContent";

const FilterContent = () => {
  return (
    <>
      {GetContent(2)}
      {GetContent(6)}
      {GetContent(2)}
      {GetContent(1)}
    </>
  );
};

export default FilterContent;
