import { useDispatch } from "react-redux";
import store from "../../../redux/store";
import { Edge, RELATION_TYPE } from "../../../models/project";
import { changeEdgeVisibility } from "../../../redux/store/project/actions";
import { MenuColumn, MenuSubHeader } from "../../../componentLibrary/box/menus";

const FilterContent = () => {
  const dispatch = useDispatch();
  const nodes = store.getState().projectState.project?.nodes;
  const edges = store.getState().projectState.project?.edges;

  let edge: Edge = null;
  const checked = edges.find((x) => x.id === edge?.id)?.isHidden as boolean;

  const handleChange = (type: string) => {
    // Find connector
    const connectors = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes[i].connectors.length; j++) {
        if (nodes[i].connectors[j].relationType === type) {
          connectors.push(nodes[i].connectors[j]);
        }
      }
    }
    // Find edge
    for (let i = 0; i < edges.length; i++) {
      for (let j = 0; j < connectors.length; j++) {
        if (
          edges[i].fromConnector === connectors[j].id ||
          edges[i].toConnector === connectors[j].id
        ) {
          edge = edges[i];
          dispatch(changeEdgeVisibility(edges[i], !edges[i].isHidden));
        }
      }
    }
  };

  return (
    <>
      <MenuColumn>
        <MenuSubHeader>Has Location</MenuSubHeader>
        <label className={"checkbox"}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => handleChange(RELATION_TYPE.HasLocation)}
          />
          <span className="checkmark"></span>
          <label className="checkbox_label"></label>
          Has Location
        </label>
      </MenuColumn>
      <MenuColumn>
        <MenuSubHeader>Transport</MenuSubHeader>
        <label className={"checkbox"}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => handleChange(RELATION_TYPE.Transport)}
          />
          <span className="checkmark"></span>
          <label className="checkbox_label"></label>
          Transport
        </label>
      </MenuColumn>
    </>
  );
};

export default FilterContent;
