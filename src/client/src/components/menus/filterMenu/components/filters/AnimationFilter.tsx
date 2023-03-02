import { Dispatch } from "redux";
import { FilterElement } from "../FilterElement";
import { TextResources } from "../../../../../assets/text/TextResources";
import { memo } from "react";

interface Props {
  isAnimated: boolean;
  visible: boolean;
  dispatch: Dispatch;
}

/**
 * Component for AnimationFilter.
 * @param interface
 * @returns a checkbox to toggle Edge animation on/off.
 */
const AnimationFilter = ({ isAnimated, visible, dispatch }: Props) => (
  <FilterElement
    label={TextResources.ANIMATION}
    onChange={() => {
      alert("Needs implementation");
    }}
    isChecked={isAnimated}
    visible={visible}
  />
);

export default memo(AnimationFilter);
