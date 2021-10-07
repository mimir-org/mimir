import { useCallback, useMemo, useState } from "react";
import { TextResources } from "../../../../../../../assets/text";
import { MenuWrapper, MenuHeader, MenuList, MenuListItem, CheckboxWrapper } from "./styled";
import { ExpandWhiteIcon, CollapseWhiteIcon } from "../../../../../../../assets/icons/common";
import { CombinedAttribute } from "../../../../../../../models";
import { MENU_LIST_ITEM_BORDER_WIDTH } from "./styled/MenuList";
import { MENU_LIST_ITEM_HEIGHT } from "./styled/MenuListItem";

const MENU_ITEM_TOOLTIP_BASE_OFFSET: number = 7;
const MENU_ITEM_OFFSET: number = MENU_LIST_ITEM_BORDER_WIDTH + MENU_LIST_ITEM_HEIGHT;

interface Props {
  items: CombinedAttribute[];
  selectedItems: CombinedAttribute[];
  keyProp: string;
  onChange: (combination: CombinedAttribute, selected: boolean) => void;
  headerColor: string;
  bodyColor: string;
}

const EntityDropdown = ({ items, selectedItems, keyProp, onChange, headerColor, bodyColor }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [activeToolTip, setActiveToolTip] = useState<CombinedAttribute>(null);
  const [activeToolTipTimeOutId, setActiveToolTipTimeOutId] = useState<NodeJS.Timeout>(null);
  const [shouldShowToolTip, setShouldShowToolTip] = useState<boolean>(false);

  const IsItemSelected = useCallback(
    (item: CombinedAttribute): boolean => !!selectedItems.find((other) => item.combined === other.combined),
    [selectedItems]
  );

  const areAllItemsSelected = useMemo(
    () => selectedItems.filter(IsItemSelected).length === items?.length,
    [items, selectedItems, IsItemSelected]
  );

  const onMouseEnter = (item: CombinedAttribute) => {
    if (item.combined !== activeToolTip?.combined) {
      setShouldShowToolTip(false);
      setActiveToolTip(null);
      setActiveToolTipTimeOutId(setTimeout(() => setShouldShowToolTip(true), 500));
      setActiveToolTip(item);
    }
  };

  const onMouseEnterSelectAll = () => {
    setActiveToolTip(null);
    setShouldShowToolTip(false);
  };

  const onMouseOut = () => {
    setShouldShowToolTip(false);
    setActiveToolTip(null);
    if (activeToolTipTimeOutId) {
      clearTimeout(activeToolTipTimeOutId);
      setActiveToolTipTimeOutId(null);
    }
  };

  const calculateTop = (item: CombinedAttribute) => {
    let base = MENU_ITEM_TOOLTIP_BASE_OFFSET;

    let numItemOffset = items.length > 1 ? 2 : 1;

    return base + (items.indexOf(item) + numItemOffset) * MENU_ITEM_OFFSET;
  };

  const renderSelectAll = () => {
    return (
      <div
        onClick={() =>
          items
            .filter((item) => selectedItems.includes(item) === areAllItemsSelected)
            .forEach((item) => onChange(item, areAllItemsSelected))
        }
      >
        <MenuListItem color={bodyColor}>
          <div className="label" onMouseEnter={onMouseEnterSelectAll}>
            {TextResources.Inspector_Params_Combinations_Select_All}
          </div>
          <CheckboxWrapper>
            <label className={"checkbox-block"}>
              <input type="checkbox" checked={areAllItemsSelected} readOnly={true} />
              <span className="checkmark-block"></span>
            </label>
          </CheckboxWrapper>
        </MenuListItem>
      </div>
    );
  };

  const renderListItem = (item: CombinedAttribute) => {
    return (
      <div onClick={() => onChange(item, IsItemSelected(item))} key={item[keyProp]}>
        <MenuListItem color={bodyColor}>
          <div className="label" onMouseEnter={() => onMouseEnter(item)}>
            {item.combined}
          </div>
          <CheckboxWrapper>
            <label className={"checkbox-block"}>
              <input type="checkbox" checked={IsItemSelected(item)} readOnly={true} />
              <span className="checkmark-block"></span>
            </label>
          </CheckboxWrapper>
        </MenuListItem>
      </div>
    );
  };

  return (
    <MenuWrapper tabIndex={0} onBlur={() => setIsListOpen(false)} onMouseLeave={onMouseOut}>
      <div onClick={() => setIsListOpen(!isListOpen)}>
        <MenuHeader open={isListOpen} color={headerColor}>
          <p>{TextResources.Inspector_Params_Combinations}</p>
          <img src={isListOpen ? ExpandWhiteIcon : CollapseWhiteIcon} alt="expand-icon" />
        </MenuHeader>
      </div>
      {isListOpen && (
        <>
          <MenuList color={headerColor}>
            {items.length > 1 && renderSelectAll()}

            {items?.map((item) => renderListItem(item))}
          </MenuList>
          {shouldShowToolTip && activeToolTip && (
            <div className="tooltipText" style={{ top: `${calculateTop(activeToolTip)}px` }}>
              <span>{activeToolTip.combined}</span>
            </div>
          )}
        </>
      )}
    </MenuWrapper>
  );
};

export default EntityDropdown;
