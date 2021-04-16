import textResources from "../../../textResources";
import { ContentColumn } from "./styled";
import GetContent from "./helpers/GetContent";

const FilterContent = () => {
  return (
    <>
      <ContentColumn>{GetContent(2, true, 0)}</ContentColumn>
      <ContentColumn>{GetContent(2, false, null)}</ContentColumn>

      <ContentColumn>{GetContent(6, true, 1)}</ContentColumn>
      <ContentColumn>{GetContent(6, false, null)}</ContentColumn>

      <ContentColumn>{GetContent(2, true, 2)}</ContentColumn>
      <ContentColumn>{GetContent(2, false, null)}</ContentColumn>

      <ContentColumn>{GetContent(1, true, 3)}</ContentColumn>
      <ContentColumn>{GetContent(1, false, null)}</ContentColumn>
    </>
  );
};

export default FilterContent;
