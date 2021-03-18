import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import textResources from "../../../../../textResources";
import StyledHeader from "../styled/StyledHeader";
import StyledInspectorInfo from "../styled/StyledInspectorInfo";
import { useInspectorChangeHandler } from "../../hooks/useInspectorChangeHandler";
import InheretedContent from "./InheretedContent";

const InheritFragment = () => {
  const dispatch = useDispatch();
  const handleClick = useInspectorChangeHandler("inherit", dispatch);
  const isOpen = useSelector<RootState>(
    (state) => state.inspectorReducer.list[4].visible
  );
  const color = "#8B008B";

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
            <InheretedContent />
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
