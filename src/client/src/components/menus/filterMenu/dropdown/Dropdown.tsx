import { useState } from "react";
import { MenuWrapper, MenuHeader, MenuList, MenuListItem, CheckboxWrapper } from "./styled";
import { ExpandIcon, CollapseIcon } from "../../../../assets/icons/chevron";
import { Connector, Edge } from "../../../../models";
import { OnChange } from "../handlers";

interface Props {
  terminals: Connector[];
  label: string;
  edges: Edge[];
  dispatch: any;
}

const Dropdown = ({ terminals, label, edges, dispatch }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <MenuWrapper>
      <div onClick={(e) => setIsListOpen(!isListOpen)}>
        <MenuHeader>
          <>
            <p>{label}</p>
            <img src={isListOpen ? ExpandIcon : CollapseIcon} alt="expand-icon" />
          </>
        </MenuHeader>
      </div>
      {isListOpen && (
        <MenuList>
          {terminals?.map((conn) => {
            const edge = edges.find((x) => x.fromConnectorId === conn.id);

            return (
              <div>
                <MenuListItem onClick={() => OnChange(edge, dispatch)}>
                  <p>{conn.name}</p>
                  <CheckboxWrapper>
                    <label className={"checkbox-block"}>
                      <input type="checkbox" checked={!edge.isHidden} onChange={() => OnChange(edge, dispatch)} />
                      <span className="checkmark-block"></span>
                    </label>
                  </CheckboxWrapper>
                </MenuListItem>
              </div>
            );
          })}
        </MenuList>
      )}
    </MenuWrapper>
  );
};

export default Dropdown;
