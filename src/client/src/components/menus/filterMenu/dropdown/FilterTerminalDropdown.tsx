import { useState } from "react";
import { MenuWrapper, MenuHeader, MenuList, MenuListItem, CheckboxWrapper } from "./styled";
import { ExpandIcon, CollapseIcon } from "../../../../assets/icons/chevron";
import { Connector, Node } from "../../../../models";

interface Props {
  terminals: Connector[];
  label: string;
  nodes: Node[];
  onChange: () => void;
}

const FilterDropdown = ({ terminals, label, nodes, onChange }: Props) => {
  const [listOpen, setListOpen] = useState(false);

  return (
    <MenuWrapper>
      <MenuHeader onClick={() => setListOpen(!listOpen)}>
        <p>{label}</p>
        <img src={listOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
      </MenuHeader>
      {listOpen && (
        <MenuList>
          <MenuListItem onClick={() => onChange()}>
            <CheckboxWrapper>
              <label className={"checkbox-block"}>
                <input type="checkbox" checked={terminals[0].visible} onChange={() => onChange()} />
                <span className="checkmark-block"></span>
              </label>
            </CheckboxWrapper>
            <p>Toggle all terminals</p>
          </MenuListItem>
          <MenuListItem onClick={() => onChange()}>
            <CheckboxWrapper>
              <label className={"checkbox-block"}>
                <input type="checkbox" checked={terminals[0].visible} onChange={() => onChange()} />
                <span className="checkmark-block"></span>
              </label>
            </CheckboxWrapper>
            <p>Toggle all active terminals</p>
          </MenuListItem>
        </MenuList>
      )}
    </MenuWrapper>
  );
};

export default FilterDropdown;
