import { useCallback, useMemo, useRef, useState } from "react";
import { TextResources } from "../../../../assets/text";
import { ExpandWhiteIcon, CollapseWhiteIcon } from "../../../../assets/icons/chevron";
import { CombinedAttribute } from "../../../../models";
import { MenuWrapper, MenuHeader, MenuList, MenuListItem, ToolTip } from "./styled/dropdown/combination";
import { Checkbox } from "../../../../compLibrary/input/checkbox/common";

const MENU_ITEM_TOOLTIP_BASE_OFFSET: number = 6;

interface Props {
  items: CombinedAttribute[];
  selectedItems: CombinedAttribute[];
  keyProp: string;
  onChange: (combination: CombinedAttribute, selected: boolean) => void;
  headerColor: string;
  bodyColor: string;
}

export const CombinationDropdown = ({ items, selectedItems, keyProp, onChange, headerColor, bodyColor }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [activeToolTip, setActiveToolTip] = useState<CombinedAttribute>(null);
  const [activeToolTipRef, setActiveToolTipRef] = useState<HTMLLabelElement>(null);
  const [activeToolTipTimeOutId, setActiveToolTipTimeOutId] = useState<NodeJS.Timeout>(null);
  const [shouldShowToolTip, setShouldShowToolTip] = useState<boolean>(false);

  const listRef = useRef<HTMLDivElement>(null);

  const IsItemSelected = useCallback(
    (item: CombinedAttribute): boolean => !!selectedItems.find((other) => item.combined === other.combined),
    [selectedItems]
  );

  const areAllItemsSelected = useMemo(
    () => selectedItems.filter(IsItemSelected).length === items?.length,
    [items, selectedItems, IsItemSelected]
  );

  const refCallback = (element: HTMLLabelElement, item: CombinedAttribute) => {
    if (item.combined === activeToolTip?.combined) {
      setActiveToolTipRef(element);
    }
  };

  const resetToolTip = () => {
    setShouldShowToolTip(false);
    setActiveToolTip(null);
  };

  const onMouseEnter = (item: CombinedAttribute) => {
    if (item.combined !== activeToolTip?.combined) {
      resetToolTip();
      setActiveToolTipTimeOutId(
        setTimeout(() => {
          setShouldShowToolTip(true);
          setActiveToolTipTimeOutId(null);
        }, 500)
      );
      setActiveToolTip(item);
    }
  };

  const onMouseOut = () => {
    resetToolTip();
    if (activeToolTipTimeOutId) {
      clearTimeout(activeToolTipTimeOutId);
      setActiveToolTipTimeOutId(null);
    }
  };
  const tooltipTopPosition = useMemo(() => {
    if (!activeToolTipRef) return 0;

    const rect = activeToolTipRef.getBoundingClientRect();
    const listRect = listRef.current.getBoundingClientRect();

    return MENU_ITEM_TOOLTIP_BASE_OFFSET + (rect.top - listRect.top);
  }, [activeToolTipRef, listRef]);

  const renderSelectAll = () => {
    const onClick = () =>
      items
        .filter((item) => selectedItems.includes(item) === areAllItemsSelected)
        .forEach((item) => onChange(item, areAllItemsSelected));

    return (
      <div>
        <MenuListItem color={bodyColor}>
          <label className="label" onMouseEnter={() => resetToolTip()}>
            {TextResources.Inspector_Params_Combinations_Select_All}
            <Checkbox isChecked={areAllItemsSelected} onChange={onClick} readOnly={true} />
          </label>
        </MenuListItem>
      </div>
    );
  };

  const renderListItem = (item: CombinedAttribute) => {
    return (
      <div key={item[keyProp]}>
        <MenuListItem color={bodyColor}>
          <label className="label" onMouseEnter={() => onMouseEnter(item)} ref={(ele) => refCallback(ele, item)}>
            {item.combined}
            <Checkbox isChecked={IsItemSelected(item)} onChange={() => onChange(item, IsItemSelected(item))} readOnly={true} />
          </label>
        </MenuListItem>
      </div>
    );
  };

  return (
    <MenuWrapper tabIndex={0} onBlur={() => setIsListOpen(false)} onMouseLeave={onMouseOut} ref={listRef}>
      <div onClick={() => setIsListOpen(!isListOpen)}>
        <MenuHeader open={isListOpen} color={headerColor}>
          <p>{TextResources.Inspector_Params_Combinations}</p>
          <img src={isListOpen ? ExpandWhiteIcon : CollapseWhiteIcon} alt="expand-icon" />
        </MenuHeader>
      </div>
      {isListOpen && (
        <>
          <MenuList color={headerColor} onScroll={() => resetToolTip()}>
            {items.length > 1 && renderSelectAll()}
            {items?.map((item) => renderListItem(item))}
          </MenuList>
          {shouldShowToolTip && activeToolTip && (
            <ToolTip top={tooltipTopPosition}>
              <span>{activeToolTip.combined}</span>
            </ToolTip>
          )}
        </>
      )}
    </MenuWrapper>
  );
};

export default CombinationDropdown;
