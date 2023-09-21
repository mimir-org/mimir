import { AddRemoveIconBox, IconBox, NameBox, OverflowItemContainer } from "./OverflowComponent.styled";
import { Checkbox } from "compLibrary/input/checkbox/common/Checkbox";
import { Color } from "assets/color/Color";
import { ConnectorIcon } from "assets/icons/connectors";
import { MinusIcon, PlusIcon } from "assets/icons/controls";

export interface MenuItem {
  id: string;
  name: string;
  checked: boolean;
  color: string;
}

interface Props {
  item: MenuItem;
  onSelect: (id: string, checked: boolean) => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
}

/**
 * Component for a MenuElement in the ProjectMenu.
 * @param interface
 * @returns a clickable element with an icon and text.
 */
export const OverflowItem = ({ item, onSelect, onAdd, onRemove }: Props) => {
  return (
    <>
      {item != null && (
        <OverflowItemContainer>
          <div>
            <Checkbox
              isChecked={item.checked}
              onChange={() => onSelect(item.id, !item.checked)}
              color={Color.LIGHT_SILVER}
              id={item.id}
            />
          </div>
          <IconBox>
            <ConnectorIcon style={{ fill: item.color }} className={""} />
          </IconBox>
          <NameBox>{item.name}</NameBox>
          <AddRemoveIconBox onClick={() => onRemove(item.id)}>
            <MinusIcon style={{ fill: item.color }} />
          </AddRemoveIconBox>
          <AddRemoveIconBox onClick={() => onAdd(item.id)}>
            <PlusIcon style={{ fill: item.color }} />
          </AddRemoveIconBox>
        </OverflowItemContainer>
      )}
    </>
  );
};
