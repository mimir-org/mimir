import { Dispatch } from "redux";
import { FilterElement } from "./FilterElement";
import { TextResources } from "../../../../../assets/text/TextResources";
import { toggleEdgeAnimation } from "../../../../../redux/store/edgeAnimation/edgeAnimationSlice";

interface Props {
  edgeAnimation: boolean;
  dispatch: Dispatch;
}

/**
 * Component for AnimationFilter.
 * @param interface
 * @returns a checkbox to toggle Edge animation on/off.
 */
export const AnimationFilter = ({ edgeAnimation, dispatch }: Props) => (
  <FilterElement
    label={TextResources.FILTER_ANIMATION}
    onChange={() => dispatch(toggleEdgeAnimation())}
    isChecked={edgeAnimation}
    visible
  />
);
