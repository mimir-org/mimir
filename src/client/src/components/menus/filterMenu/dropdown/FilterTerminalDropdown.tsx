import { useState } from "react";
import { MenuWrapper, MenuHeader, MenuList, MenuListItem, CheckboxWrapper } from "./styled";
import { ExpandIcon, CollapseIcon } from "../../../../assets/icons/chevron";
import { Connector } from "../../../../models";
import { TextResources } from "../../../../assets/text";

interface Props {
  activeTerminals: Connector[];
  allTerminals: Connector[];
  label: string;
  onActiveTerminalsChange: () => void;
  onAllTerminalsChange: () => void;
}

const FilterTerminalDropdown = ({
  activeTerminals,
  allTerminals,
  label,
  onActiveTerminalsChange,
  onAllTerminalsChange,
}: Props) => {
  const [listOpen, setListOpen] = useState(false);

  return (
    <MenuWrapper>
      <MenuHeader onClick={() => setListOpen(!listOpen)}>
        <p>{label}</p>
        <img src={listOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
      </MenuHeader>
      {listOpen && (
        <MenuList>
          <MenuListItem onClick={() => onAllTerminalsChange()}>
            <CheckboxWrapper>
              <label className={"checkbox-block"}>
                <input type="checkbox" checked={allTerminals[0]?.visible} onChange={() => onAllTerminalsChange()} />
                <span className="checkmark-block"></span>
              </label>
            </CheckboxWrapper>
            <p>{TextResources.Filter_Toggle_Terminals}</p>
          </MenuListItem>
          <MenuListItem onClick={() => onActiveTerminalsChange()}>
            <CheckboxWrapper>
              <label className={"checkbox-block"}>
                <input
                  type="checkbox"
                  checked={activeTerminals[0]?.visible}
                  onChange={() => onActiveTerminalsChange()}
                />
                <span className="checkmark-block"></span>
              </label>
            </CheckboxWrapper>
            <p>{TextResources.Filter_Toggle_Active_Terminals}</p>
          </MenuListItem>
        </MenuList>
      )}
    </MenuWrapper>
  );
};

export default FilterTerminalDropdown;
