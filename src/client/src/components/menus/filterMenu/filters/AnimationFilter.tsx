import { Dispatch } from "redux";
import { FilterElement } from "../";
import { TextResources } from "../../../../assets/text";
import { toggleEdgeAnimation } from "../../../../redux/store/edgeAnimation/edgeAnimationSlice";

interface Props {
  edgeAnimation: boolean;
  dispatch: Dispatch;
}

/**
 * Component for AnimationFilter.
 * @param interface
 * @returns a checkbox to toggle Edge animation on/off.
 */
const AnimationFilter = ({ edgeAnimation, dispatch }: Props) => (
  <FilterElement
    label={TextResources.Filter_Edge_Animation}
    onChange={() => dispatch(toggleEdgeAnimation())}
    isChecked={edgeAnimation}
    visible={true}
  />
);

export default AnimationFilter;
