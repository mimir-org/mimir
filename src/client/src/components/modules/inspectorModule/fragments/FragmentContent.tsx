import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { FragmentHeader, FragmentDataWrapper } from "./styled";
import { useInspectorChangeHandler } from "../hooks/useInspectorChangeHandler";
import { FragmentData } from ".";
import { GetContentData, GetTextResource } from "./helpers";

const FragmentContent = ({ index }) => {
  const header = GetTextResource(index);
  const data = GetContentData(index);
  const handleClick = useInspectorChangeHandler(index);

  const isOpen = useSelector<RootState>(
    (state) => state.inspectorReducer.list[index].visible
  );

  return (
    <>
      {isOpen ? (
        <>
          <FragmentHeader active="true" onClick={handleClick}>
            {header}
          </FragmentHeader>
          <FragmentDataWrapper>
            <FragmentData data={data.content} />
          </FragmentDataWrapper>
        </>
      ) : (
        <FragmentHeader onClick={handleClick}>{header}</FragmentHeader>
      )}
    </>
  );
};

export default FragmentContent;
