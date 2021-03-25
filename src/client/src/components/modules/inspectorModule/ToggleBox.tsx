import { useDispatch, useSelector } from "react-redux";
import { StyledToggleBox, StyledInspectorTitle } from "./fragments/styled/";
import { AnimatedToggleButton } from "./styled/animated/";
import useInspectorToggleChangeHandler from "./hooks/useInspectorToggleChangeHandler";
import { RootState } from "../../../redux/store";
import textResources from "../../../textResources";

const ToggleBox = () => {
  const dispatch = useDispatch();
  const isInspectorVisible = useSelector<RootState>(
    (state) => state.showInspectorReducer.visible
  );
  const handleClick = useInspectorToggleChangeHandler(
    dispatch,
    isInspectorVisible
  );
  return (
    <StyledToggleBox>
      <StyledInspectorTitle>
        {textResources.Inspector_Heading}
      </StyledInspectorTitle>
      <AnimatedToggleButton
        onClick={handleClick}
        visible={isInspectorVisible}
        start="0"
        stop="305"
        float="right"
      />
    </StyledToggleBox>
  );
};

export default ToggleBox;
