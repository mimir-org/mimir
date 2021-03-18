import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import textResources from "../../../../../textResources";
import StyledHeader from "../styled/StyledHeader";
import StyledInspectorInfo from "../styled/StyledInspectorInfo";
import { useInspectorChangeHandler } from "../../hooks/useInspectorChangeHandler";
import { FragmentContent } from "../";
import GetContentData from "../data/GetContentData";

const RelationsFragment = () => {
  const dispatch = useDispatch();
  const index = 3;
  const color = "#FF7F50";
  const data = GetContentData(index);
  const handleClick = useInspectorChangeHandler(index, dispatch);

  const isOpen = useSelector<RootState>(
    (state) => state.inspectorReducer.list[3].visible
  );

  return (
    <>
      {isOpen ? (
        <>
          <StyledHeader color={color} active="true" onClick={handleClick}>
            {textResources.Inspector_Relations}
          </StyledHeader>
          <StyledInspectorInfo color={color}>
            <FragmentContent data={data.content} />
          </StyledInspectorInfo>
        </>
      ) : (
        <StyledHeader color={color} onClick={handleClick}>
          {textResources.Inspector_Relations}
        </StyledHeader>
      )}
    </>
  );
};

export default RelationsFragment;
