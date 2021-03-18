import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import textResources from "../../../../../textResources";
import StyledHeader from "../styled/StyledHeader";
import StyledInspectorInfo from "../styled/StyledInspectorInfo";
import { useInspectorChangeHandler } from "../../hooks/useInspectorChangeHandler";
import HeaderContent from "./HeaderContent";

const HeaderFragment = () => {
  const dispatch = useDispatch();
  const handleClick = useInspectorChangeHandler("header", dispatch);

  const isOpen = useSelector<RootState>(
    (state) => state.inspectorReducer.list[1].visible
  );

  const color = "#FFDEAD";

  return (
    <>
      {isOpen ? (
        <>
          <StyledHeader color={color} active="true" onClick={handleClick}>
            {textResources.Inspector_Header}
          </StyledHeader>
          <StyledInspectorInfo color={color}>
            <HeaderContent />
          </StyledInspectorInfo>
        </>
      ) : (
        <StyledHeader color={color} onClick={handleClick}>
          {textResources.Inspector_Header}
        </StyledHeader>
      )}
    </>
  );
};

export default HeaderFragment;
