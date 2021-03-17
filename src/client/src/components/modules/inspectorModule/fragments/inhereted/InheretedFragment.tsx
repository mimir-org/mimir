import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import textResources from "../../../../../textResources";
import StyledHeader from "../styled/StyledHeader";
import StyledInspectorInfo from "../styled/StyledInspectorInfo";
import { useInspectorChangeHandler } from "../../hooks/useInspectorChangeHandler";

const InheritFragment = () => {
  const dispatch = useDispatch();
  const handleClick = useInspectorChangeHandler("inherit", dispatch);
  const isOpen = useSelector<RootState>(
    (state) => state.inspectorReducer.list[3].visible
  );
  const color = "#8B008B";

  return (
    <>
      {isOpen ? (
        <>
          <StyledHeader color={color} active="true" onClick={handleClick}>
            {textResources.Inspector_Inhereted}
          </StyledHeader>
          <StyledInspectorInfo color={color}>
            Info inherited etc
          </StyledInspectorInfo>
        </>
      ) : (
        <StyledHeader color={color} onClick={handleClick}>
          {textResources.Inspector_Inhereted}
        </StyledHeader>
      )}
    </>
  );
};

export default InheritFragment;
