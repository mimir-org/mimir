import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import textResources from "../../../../../textResources";
import StyledHeader from "../styled/StyledHeader";
import StyledInspectorInfo from "../styled/StyledInspectorInfo";
import { useInspectorChangeHandler } from "../../hooks/useInspectorChangeHandler";
import { FragmentContent } from "../";
import GetContentData from "../data/GetContentData";

const InheritFragment = () => {
  const dispatch = useDispatch();
  const index = 4;
  const color = "#8B008B";
  const data = GetContentData(index);
  const handleClick = useInspectorChangeHandler(index, dispatch);

  const isOpen = useSelector<RootState>(
    (state) => state.inspectorReducer.list[index].visible
  );

  return (
    <>
      {isOpen ? (
        <>
          <StyledHeader
            color={color}
            text="white"
            active="true"
            onClick={handleClick}
          >
            {textResources.Inspector_Inhereted}
          </StyledHeader>
          <StyledInspectorInfo color={color} text="white">
            <FragmentContent data={data.content} />
          </StyledInspectorInfo>
        </>
      ) : (
        <StyledHeader color={color} text="white" onClick={handleClick}>
          {textResources.Inspector_Inhereted}
        </StyledHeader>
      )}
    </>
  );
};

export default InheritFragment;
