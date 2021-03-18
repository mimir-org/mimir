import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import textResources from "../../../../../textResources";
import StyledHeader from "../styled/StyledHeader";
import StyledInspectorInfo from "../styled/StyledInspectorInfo";
import { useInspectorChangeHandler } from "../../hooks/useInspectorChangeHandler";
import ObjectContent from "./ObjectContent";

const ObjectFragment = () => {
  const dispatch = useDispatch();
  const handleClick = useInspectorChangeHandler("object", dispatch);
  const isOpen = useSelector<RootState>(
    (state) => state.inspectorReducer.list[0].visible
  );
  const color = "#fff";

  return (
    <>
      {isOpen ? (
        <>
          <StyledHeader color={color} active="true" onClick={handleClick}>
            {textResources.Inspector_Object}
          </StyledHeader>
          <StyledInspectorInfo color={color}>
            <ObjectContent />
          </StyledInspectorInfo>
        </>
      ) : (
        <StyledHeader color={color} onClick={handleClick}>
          {textResources.Inspector_Object}
        </StyledHeader>
      )}
    </>
  );
};

export default ObjectFragment;
