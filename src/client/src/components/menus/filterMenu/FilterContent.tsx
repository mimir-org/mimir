import { useDispatch } from "react-redux";
import { Connector, Edge } from "../../../models";
import { OnChange } from "./handlers";

interface Props {
  conn: Connector;
  edges: Edge[];
}

const FilterContent = ({ conn, edges }: Props) => {
  const dispatch = useDispatch();
  const edge = edges.find((x) => x.fromConnectorId === conn.id);
  const visible = true;

  return (
    <label className={"checkbox-filter"}>
      {visible && (
        <>
          <input type="checkbox" checked={!edge.isHidden} onChange={() => OnChange(edge, dispatch)} />
          <span className="checkmark-filter"></span>
          {conn.name}
        </>
      )}
    </label>
  );
};

export default FilterContent;
