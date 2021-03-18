import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import textResources from "../../../../../textResources";
import StyledHeader from "../styled/StyledHeader";
import StyledInspectorInfo from "../styled/StyledInspectorInfo";
import { useInspectorChangeHandler } from "../../hooks/useInspectorChangeHandler";
import BodyContent from "./BodyConent";

const BodyFragment = () => {
  const dispatch = useDispatch();
  const handleClick = useInspectorChangeHandler("body", dispatch);
  const isOpen = useSelector<RootState>(
    (state) => state.inspectorReducer.list[2].visible
  );
  const color = "#9ACD32";

  return (
    <>
      {isOpen ? (
        <>
          <StyledHeader color={color} active="true" onClick={handleClick}>
            {textResources.Inspector_Body}
          </StyledHeader>
          <StyledInspectorInfo color={color}>
            <BodyContent />
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
