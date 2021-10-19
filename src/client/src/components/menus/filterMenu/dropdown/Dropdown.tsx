import { useState } from "react";
import { MenuWrapper, MenuHeader, MenuList, MenuListItem, CheckboxWrapper, ColorBar } from "./styled";
import { ExpandIcon, CollapseIcon } from "../../../../assets/icons/chevron";
import { Connector, Edge, Node } from "../../../../models";
import { OnChange } from "../handlers";
import { IsPartOfTerminal } from "../../../flow/helpers";
import { GetFilterColor, GetPartOfName } from "../helpers";

interface Props {
  terminals: Connector[];
  label: string;
  nodes: Node[];
  edges: Edge[];
  dispatch: any;
}

const Dropdown = ({ terminals, label, nodes, edges, dispatch }: Props) => {
  const [listOpen, setListOpen] = useState(false);

  return (
    <MenuWrapper>
      <div onClick={(e) => setListOpen(!listOpen)}>
        <MenuHeader>
          <p>{label}</p>
          <img src={listOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
        </MenuHeader>
      </div>
      {listOpen && (
        <MenuList>
          {terminals?.map((conn) => {
            const edge = edges.find((x) => x.fromConnectorId === conn.id);
            let name = conn.name;
            if (IsPartOfTerminal(conn)) name += GetPartOfName(conn, nodes);

            return (
              <MenuListItem onClick={() => OnChange(edge, dispatch)} key={conn.id}>
                <CheckboxWrapper>
                  <label className={"checkbox-block"}>
                    <input type="checkbox" checked={!edge.isHidden} onChange={() => OnChange(edge, dispatch)} />
                    <span className="checkmark-block"></span>
                  </label>
                </CheckboxWrapper>
                <ColorBar color={GetFilterColor(conn, nodes)} />
                <p>{name}</p>
              </MenuListItem>
            );
          })}
        </MenuList>
      )}
    </MenuWrapper>
  );
};

export default Dropdown;
