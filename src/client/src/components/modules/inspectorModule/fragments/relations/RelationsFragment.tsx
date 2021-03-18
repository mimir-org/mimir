import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import textResources from "../../../../../textResources";
import StyledHeader from "../styled/StyledHeader";
import StyledInspectorInfo from "../styled/StyledInspectorInfo";
import { useInspectorChangeHandler } from "../../hooks/useInspectorChangeHandler";
import RelationContent from "./RelationsContent";

const RelationsFragment = () => {
  const dispatch = useDispatch();
  const handleClick = useInspectorChangeHandler("relations", dispatch);
  const isOpen = useSelector<RootState>(
    (state) => state.inspectorReducer.list[3].visible
  );
  const color = "#FF7F50";

  return (
    <>
      {isOpen ? (
        <>
          <StyledHeader color={color} active="true" onClick={handleClick}>
            {textResources.Inspector_Relations}
          </StyledHeader>
          <StyledInspectorInfo color={color}>
            <RelationContent />
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
