import { useState } from "react";
import {
  ConnectorType,
  TerminalType,
  TerminalTypeItem,
} from "../../../../../models";
import {
  TerminalListElement,
  TerminalCategoryWrapper,
  AddTerminalWrapper,
} from "../../styled";
import { ExpandIcon, CollapseIcon } from "../../../../../assets/icons/common";
import AddTerminal from "./AddTerminal/AddTerminalComponent";
import { TextResources } from "../../../../../assets/text";

interface Props {
  name: string;
  terminalTypes: TerminalType[];
  categoryId: string;
  onChange: Function;
  defaultTerminals?: TerminalTypeItem[];
}

export const ObjectBlockElement = ({
  name,
  categoryId,
  terminalTypes,
  onChange,
  defaultTerminals,
}: Props) => {
  const [expandCategory, setExpandCategory] = useState(true);

  const terminalsQuantity = defaultTerminals?.length;

  const defaultTerminal = {
    row: terminalsQuantity,
    terminalTypeId: "",
    selected: false,
    connectorType: ConnectorType.Input,
    number: 1,
    categoryId: categoryId,
  } as TerminalTypeItem;

  const onCategoryAdd = (terminal: TerminalTypeItem) => {
    setExpandCategory(true);
    onChange("add", terminal, categoryId, defaultTerminals.length);
  };

  const onCategoryUpdateOrRemove = (
    key: string,
    terminal: TerminalTypeItem,
    row: number
  ) => {
    onChange(key, terminal, categoryId, row);
  };

  const showTerminals = () => {
    let terminalsArray = [];
    if (terminalsQuantity > 0) {
      terminalsArray = defaultTerminals;
      return terminalsArray.map((t, index) => {
        return (
          <AddTerminal
            row={index}
            key={index}
            terminals={terminalTypes}
            defaultTerminal={t}
            onChange={onCategoryUpdateOrRemove}
          />
        );
      });
    }
  };

  return (
    <TerminalListElement>
      <TerminalCategoryWrapper>
        <p>{name}</p>
        <button onClick={() => onCategoryAdd(defaultTerminal)}>
          {TextResources.TypeEditor_Properties_Add_Terminal}
        </button>
        {terminalsQuantity > 0 && (
          <img
            src={expandCategory ? ExpandIcon : CollapseIcon}
            alt="expand-icon"
            onClick={() => setExpandCategory(!expandCategory)}
          />
        )}
      </TerminalCategoryWrapper>
      {terminalsQuantity > 0 && expandCategory && (
        <AddTerminalWrapper>{showTerminals()}</AddTerminalWrapper>
      )}
    </TerminalListElement>
  );
};
export default ObjectBlockElement;
