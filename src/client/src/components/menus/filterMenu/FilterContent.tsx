import { useState } from "react";
import { IsBlockView } from "../../flow/block/helpers";
import { Connector, Edge, Node, RelationType } from "../../../models";
import { MenuSubHeader } from "../../../compLibrary/box/menus";
import { OnChange } from "./handlers";
import { CheckBlockEdges, CheckEdges, IsChecked } from "./helpers";
import { useAppDispatch } from "../../../redux/store";

interface Props {
  conn?: Connector;
  type: RelationType | string;
  name: string;
  header: boolean;
  node?: Node;
  edges: Edge[];
}

const FilterContent = ({ conn, type, name, header, node, edges }: Props) => {
  const dispatch = useAppDispatch();
  const isVisible = name !== null;

  let selectedElements = !IsBlockView() ? CheckEdges(edges, type, node) : CheckBlockEdges(edges, type);
  const [, setChecked] = useState(IsChecked(type, edges, conn, node, name));

  return header ? (
    <label className={"checkbox"}>
      <input
        type="checkbox"
        checked={IsChecked(type, edges, conn, node, name)}
        onChange={() => OnChange(edges, setChecked, dispatch, selectedElements, type, name, node, conn)}
      />
      <span className="checkmark"></span>
      <MenuSubHeader>{name}</MenuSubHeader>
    </label>
  ) : (
    <label className={"checkbox-filter"}>
      {isVisible && (
        <>
          <input
            type="checkbox"
            checked={IsChecked(type, edges, conn, node, name)}
            onChange={() => OnChange(edges, setChecked, dispatch, selectedElements, type, name, node, conn)}
          />
          <span className="checkmark-filter"></span>
          {name}
        </>
      )}
    </label>
  );
};

export default FilterContent;
