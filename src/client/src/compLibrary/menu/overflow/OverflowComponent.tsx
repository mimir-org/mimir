import { OverflowComponentContainer, OverflowItemsContainer } from "./OverflowComponent.styled";
import * as Icons from "assets/icons/terminalsMenu";
import { useState } from "react";
import { IconButton } from "compLibrary/buttons/icon/IconButton";
import { Icon } from "compLibrary/buttons/icon/IconButtonStyled";
import { MenuItem, OverflowItem } from "./OverflowItem";

interface Props {
  orientation: "Left" | "Right";
  borderColor: string;
  onSelect: (id: string, checked: boolean) => void;
  onAdd: (id: string) => void;
  onRemove: (id: string) => void;
  items: MenuItem[];
}

/**
 * Component for a MenuElement in the ProjectMenu.
 * @param interface
 * @returns a clickable element with an icon and text.
 */
export const OverflowComponent = ({ orientation, borderColor, onSelect, onAdd, onRemove, items }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <OverflowComponentContainer visible={true} orientation={orientation} borderColor={borderColor}>
        <IconButton onClick={() => setVisible(!visible)} icon={<Icon src={Icons.ParentMenu} />}>
          Menu
        </IconButton>
        <OverflowItemsContainer visible={visible} orientation={orientation} borderColor={borderColor}>
          {items != null &&
            items.length > 0 &&
            items.map((item) => {
              return <OverflowItem key={item.id} onSelect={onSelect} onAdd={onAdd} onRemove={onRemove} item={item} />;
            })}
        </OverflowItemsContainer>
      </OverflowComponentContainer>
    </>
  );
};
