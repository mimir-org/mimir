import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import textResources from "../../../../../textResources";
import StyledHeader from "../styled/StyledHeader";
import StyledInspectorInfo from "../styled/StyledInspectorInfo";
import { useInspectorChangeHandler } from "../../hooks/useInspectorChangeHandler";
import { FragmentContent } from "../";
import GetContentData from "../data/GetContentData";

const BodyFragment = () => {
  const dispatch = useDispatch();
  const index = 2;
  const color = "#9ACD32";
  const data = GetContentData(index);
  const handleClick = useInspectorChangeHandler(index, dispatch);

  const isOpen = useSelector<RootState>(
    (state) => state.inspectorReducer.list[index].visible
  );

  return (
    <>
      {isOpen ? (
        <>
          <StyledHeader color={color} active="true" onClick={handleClick}>
            {textResources.Inspector_Body}
          </StyledHeader>
          <StyledInspectorInfo color={color}>
            <FragmentContent data={data.content} />
          </StyledInspectorInfo>
        </>
      ) : (
        <StyledHeader color={color} onClick={handleClick}>
          {textResources.Inspector_Body}
        </StyledHeader>
      )}
    </>
  );
};

export default BodyFragment;
