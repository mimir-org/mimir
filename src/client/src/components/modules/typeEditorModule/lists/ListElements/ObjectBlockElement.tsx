import { useState } from "react";
import { AddTerminalComponent } from "../";
import { TextResources } from "../../../../../assets/text";
import { CreateId } from "../../../../flow/helpers";
import { AddIcon, DeleteIcon } from "../../../../../assets/icons/common";
import { ConnectorType, TerminalType, TerminalTypeItem } from "../../../../../models";
import { TerminalListElement, TerminalCategoryWrapper, AddTerminalWrapper } from "../../styled";
interface Props {
  name: string;
  terminalTypes: TerminalType[];
  categoryId: string;
  onChange: Function;
  defaultTerminals?: TerminalTypeItem[];
}

export const ObjectBlockElement = ({ name, categoryId, terminalTypes, onChange, defaultTerminals }: Props) => {
  const [expandCategory, setExpandCategory] = useState(true);

  const terminalsQuantity = defaultTerminals?.length;

  const defaultTerminal = {
    terminalId: CreateId(),
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

  const onCategoryUpdateOrRemove = (key: string, terminal: TerminalTypeItem, terminalId: string) => {
    onChange(key, terminal, categoryId, terminalId);
  };

  const showTerminals = () => {
    let terminalsArray = [];
    if (terminalsQuantity > 0) {
      terminalsArray = defaultTerminals;
      return terminalsArray.map((t, index) => {
        return (
          <AddTerminalComponent
            key={index}
            terminalId={t.terminalId}
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
        <button onClick={() => onCategoryAdd(defaultTerminal)}>
          <img src={AddIcon} alt="add-icon" className="add-icon" />
          <p className="add-text">{TextResources.TypeEditor_Properties_Add_Terminal}</p>
        </button>
        <p className="terminal-name" onClick={() => terminalsQuantity > 0 && setExpandCategory(!expandCategory)}>
          {name}
        </p>
        {terminalsQuantity > 0 && (
          <button className="delete-button" onClick={() => onChange("removeAll", categoryId)}>
            <img src={DeleteIcon} alt="delete-icon" className="delete-icon" />
            <p className="delete-text">{TextResources.TypeEditor_Properties_Clear_All_Terminal}</p>
          </button>
        )}
      </TerminalCategoryWrapper>
      {terminalsQuantity > 0 && expandCategory && <AddTerminalWrapper>{showTerminals()}</AddTerminalWrapper>}
    </TerminalListElement>
  );
};
export default ObjectBlockElement;
