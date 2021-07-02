import red from "../../../redux/store";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { IsBlockView } from "../../flow/helpers/block";
import { Edge } from "../../../models";
import { TextResources } from "../../../assets/textResources";
import { MenuColumn, MenuSubHeader } from "../../../compLibrary/box/menus";
import {
  changeEdgeVisibility,
  changeActiveConnector,
} from "../../../redux/store/project/actions";
import {
  CheckBlockEdges,
  CheckEdges,
  FindConnectorNode,
  IsEdge,
} from "./helpers";

const FilterContent = ({ type, index }) => {
  const dispatch = useDispatch();
  const edges = red.store.getState().projectState.project?.edges as Edge[];
  let selectedElements = !IsBlockView()
    ? CheckEdges(edges, type)
    : CheckBlockEdges(edges, type);

  let isChecked = edges.find((x) => x.id === selectedElements[0]?.id)?.isHidden;
  const [checked, setChecked] = useState(!isChecked);

  const handleChange = () => {
    if (edges) {
      setChecked(!checked);
      selectedElements.forEach((element) => {
        if (IsEdge(element)) {
          dispatch(changeEdgeVisibility(element, !element.isHidden));
        } else {
          const connNode = FindConnectorNode(element);
          dispatch(
            changeActiveConnector(connNode, element.id, !element.visible, 0)
          );
        }
      });
    }
  };

  const name =
    index === 0
      ? "Part of"
      : index === 1
      ? "Has Location"
      : index === 2
      ? "Transport"
      : index === 3
      ? "Show All"
      : ""; // TODO: Get name for type

  return (
    <MenuColumn>
      {index === 0 && (
        <MenuSubHeader>{TextResources.Filter_Other}</MenuSubHeader>
      )}

      <label className={"checkbox-filter"}>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className="checkmark-filter"></span>
        {name}
      </label>
    </MenuColumn>
  );
};

export default FilterContent;
