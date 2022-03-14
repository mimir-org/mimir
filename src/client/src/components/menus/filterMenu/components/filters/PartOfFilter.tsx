import { Dispatch } from "redux";
import { FilterElement } from "./FilterElement";
import { TextResources } from "../../../../../assets/text/TextResources";
import { Connector, Edge, Node } from "../../../../../models";
import { OnAllPartOfChange, OnFilterChange } from "./handlers";
import { AllPartOfChecked, GetPartOfName } from "./helpers";
interface Props {
  edges: Edge[];
  nodes: Node[];
  items: Connector[];
  dispatch: Dispatch;
  visible: boolean;
}

/**
 * Component for partOf relations.
 * @param interface
 * @returns checkboxes to toggle partOf relations that exist in Mimir.
 */
export const PartOfFilter = ({ edges, nodes, items, dispatch, visible }: Props) =>
  visible && (
    <>
      <FilterElement
        label={TextResources.FILTER_PARTOF}
        onChange={() => OnAllPartOfChange(edges, dispatch)}
        isChecked={AllPartOfChecked(edges)}
        visible={visible}
        isHeader
      />
      {items.map((conn) => {
        const edge = edges.find((x) => x.fromConnectorId === conn.id);
        const node = nodes.find((n) => n.id === conn.nodeId);
        const name = GetPartOfName(conn, node);

        return (
          <FilterElement
            key={conn.id}
            label={name}
            onChange={() => OnFilterChange(edge, edges, dispatch)}
            isChecked={!edge.isHidden}
            indent={2}
            visible
          />
        );
      })}
    </>
  );
