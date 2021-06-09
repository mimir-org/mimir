import { useDispatch } from "react-redux";
import red from "../../../redux/store";
import { changeEdgeVisibility } from "../../../redux/store/project/actions";
import { MenuColumn, MenuSubHeader } from "../../../componentLibrary/box/menus";
import { useState } from "react";
import { CheckEdges } from "./helpers";
import { TextResources } from "../../../assets/textResources";

const FilterContent = ({ type, index }) => {
  const dispatch = useDispatch();
  const nodes = red.store.getState().projectState.project?.nodes;
  const edges = red.store.getState().projectState.project?.edges;

  let edgesRemove = CheckEdges(nodes, edges, type);
  let isChecked = edges.find((x) => x.id === edgesRemove[0]?.id)?.isHidden;
  const [checked, setChecked] = useState(!isChecked);

  const handleChange = () => {
    if (edges) {
      setChecked(!checked);
      edgesRemove.forEach((_edge, index) => {
        dispatch(
          changeEdgeVisibility(edgesRemove[index], !edgesRemove[index].isHidden)
        );
      });
    }
  };

  return (
    <MenuColumn>
      {index === 0 && (
        <MenuSubHeader>{TextResources.Filter_Other}</MenuSubHeader>
      )}

      <label className={"checkbox-filter"}>
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className="checkmark-filter"></span>
        {type}
      </label>
    </MenuColumn>
  );
};

export default FilterContent;
