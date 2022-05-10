import { Dispatch } from "redux";
import { FilterElement } from "../FilterElement";
import { TextResources } from "../../../../../assets/text/TextResources";
import { toggleEdgeAnimation } from "../../../../../redux/store/edgeAnimation/edgeAnimationSlice";
import { memo } from "react";

interface Props {
  isAnimated: boolean;
  dispatch: Dispatch;
}

/**
 * Component for AnimationFilter.
 * @param interface
 * @returns a checkbox to toggle Edge animation on/off.
 */
const AnimationFilter = ({ isAnimated, dispatch }: Props) => {
  return (
    <FilterElement
      label={TextResources.ANIMATION}
      onChange={() => dispatch(toggleEdgeAnimation())}
      isChecked={isAnimated}
      visible
    />
  );
};

export default memo(AnimationFilter);
