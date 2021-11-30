import { FilterElement } from "../";
import { TextResources } from "../../../../assets/text";
import { Edge } from "../../../../models";
import { OnEdgeAnimationChange } from "../handlers";

interface Props {
  edges: Edge[];
  edgeAnimation: boolean;
  dispatch: any;
}

/**
 * Component for AnimationFilter.
 * @param interface
 * @returns a checkbox to toggle Edge animation on/off.
 */
const AnimationFilter = ({ edges, edgeAnimation, dispatch }: Props) => (
  <FilterElement
    label={TextResources.Filter_Edge_Animation}
    onChange={() => OnEdgeAnimationChange(edges, dispatch, edgeAnimation)}
    isChecked={edgeAnimation}
    visible={true}
  />
);

export default AnimationFilter;
