import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { FragmentHeader, FragmentDataWrapper } from "./styled";
import { useInspectorChangeHandler } from "../hooks/useInspectorChangeHandler";
import { FragmentData } from ".";
import { GetContentData, GetTextResource } from "./helpers";

const FragmentContent = ({ index }) => {
<<<<<<< HEAD
  const backgroundColor = "#C0C0C0";
=======
  const textColor = GetColor(index, "text");
  const backgroundColor = GetColor(index);
>>>>>>> 279cc55 (Add flow elements)
  const header = GetTextResource(index);

  const dispatch = useDispatch();
  const data = GetContentData(index);
  const handleClick = useInspectorChangeHandler(index, dispatch);

  const isOpen = useSelector<RootState>(
    (state) => state.inspectorReducer.list[index].visible
  );

  return (
    <>
      {isOpen ? (
        <>
          <FragmentHeader
            color={backgroundColor}
            active="true"
            onClick={handleClick}
          >
            {header}
          </FragmentHeader>
          <FragmentDataWrapper color={backgroundColor}>
            <FragmentData data={data.content} />
          </FragmentDataWrapper>
        </>
      ) : (
        <FragmentHeader color={backgroundColor} onClick={handleClick}>
          {header}
        </FragmentHeader>
      )}
    </>
  );
};

export default FragmentContent;
