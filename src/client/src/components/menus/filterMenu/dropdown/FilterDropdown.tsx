import { useState } from "react";
import { MenuWrapper, MenuHeader, MenuList, MenuListItem, CheckboxWrapper, ColorBar } from "./styled";
import { ExpandIcon, CollapseIcon } from "../../../../assets/icons/chevron";
import { Connector, Edge, Node } from "../../../../models";
import { IsPartOf } from "../../../flow/helpers";
import { GetFilterColor, GetPartOfName } from "../helpers";

interface Props {
  terminals: Connector[];
  label: string;
  nodes: Node[];
  edges: Edge[];
  onChange: (item: Edge) => void;
  visible: boolean;
}

/**
 * Component for a drop-down menu in Visual Filter.
 * @param params
 * @returns a drop-down menu.
 */
const FilterDropdown = ({ terminals, label, nodes, edges, onChange, visible }: Props) => {
  const [listOpen, setListOpen] = useState(false);

  return (
    visible && (
      <MenuWrapper>
        <MenuHeader onClick={() => setListOpen(!listOpen)}>
          <p>{label}</p>
          <img src={listOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
        </MenuHeader>
        {listOpen && (
          <MenuList>
            {terminals.map((conn) => {
              const edge = edges.find((x) => x.fromConnectorId === conn.id);
              const node = nodes.find((n) => n.id === conn.nodeId);
              const name = IsPartOf(conn) ? GetPartOfName(conn, node) : conn.name;

              return (
                <MenuListItem onClick={() => onChange(edge)} key={conn.id}>
                  <CheckboxWrapper>
                    <label className={"checkbox-block"}>
                      <input type="checkbox" checked={!edge.isHidden} onChange={() => onChange(edge)} />
                      <span className="checkmark-block"></span>
                    </label>
                  </CheckboxWrapper>
                  <ColorBar color={conn.color ?? GetFilterColor(conn, node)} />
                  <p>{name}</p>
                </MenuListItem>
              );
            })}
          </MenuList>
        )}
      </MenuWrapper>
    )
  );
};

export default FilterDropdown;
