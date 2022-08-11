import { Dispatch } from "redux";
import { TextResources } from "../../../../../assets/text/TextResources";
import { OnAllPartOfChange, OnFilterChange } from "./handlers";
import { AreAllPartOfChecked, GetPartOfName } from "./helpers";
import { FilterElement } from "../FilterElement";
import { Node, Edge, Relation } from "@mimirorg/modelbuilder-types";

interface Props {
  edges: Edge[];
  nodes: Node[];
  relations: Relation[];
  dispatch: Dispatch;
  visible: boolean;
}

/**
 * Component for partOf relations in the Visual Filter.
 * @param interface
 * @returns checkboxes to toggle partOf relations that exist in Mimir.
 */
export const PartOfRelationsFilter = ({ edges, nodes, relations, dispatch, visible }: Props) =>
  visible && (
    <>
      <FilterElement
        label={TextResources.PARTOF_RELATIONSHIP}
        onChange={() => OnAllPartOfChange(edges, dispatch)}
        isChecked={AreAllPartOfChecked(edges)}
        visible={visible}
        isHeader
      />
      {relations.map((r) => {
        const edge = edges.find((e) => e.fromConnectorId === r.id);
        const node = nodes.find((n) => n.id === r.nodeId);
        const name = GetPartOfName(r, node);

        return (
          <FilterElement
            key={r.id}
            label={name}
            onChange={() => OnFilterChange(edge, edges, nodes, dispatch)}
            isChecked={!edge.hidden}
            indent={2}
            visible
          />
        );
      })}
    </>
  );
