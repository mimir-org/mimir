import { useState } from "react";
import { AddTerminalComponent } from "../";
import { TextResources } from "../../../assets/text";
import { CreateId } from "../../../components/flow/helpers";
import { AddIcon } from "../../../assets/icons/type";
import { ConnectorType, TerminalType, TerminalTypeItem } from "../../../models";
import { TerminalListElement, TerminalCategoryWrapper, AddTerminalWrapper } from "../../styled";
import { OnTerminalCategoryChangeFunction, TerminalCategoryChangeKey } from "../../types";

interface Props {
  name: string;
  terminalTypes: TerminalType[];
  categoryId: string;
  onChange: OnTerminalCategoryChangeFunction;
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
    onChange("add", terminal);
  };

  const onCategoryUpdateOrRemove = (key: TerminalCategoryChangeKey, terminal: TerminalTypeItem) => {
    onChange(key, terminal);
  };

  const showTerminals = () => {
    let terminalsArray: TerminalTypeItem[] = [];
    if (terminalsQuantity > 0) {
      terminalsArray = defaultTerminals.map((t) => {
        t.terminalId = CreateId();
        return t;
      });
      return terminalsArray.map((t) => {
        return (
          <AddTerminalComponent
            key={t.terminalId}
            terminals={terminalTypes}
            defaultTerminal={t}
            onChange={(key, data) => onCategoryUpdateOrRemove(key, data)}
          />
        );
      });
    }
  };

  return (
    <TerminalListElement>
      <TerminalCategoryWrapper expanded={terminalsQuantity > 0}>
        <button onClick={() => onCategoryAdd(defaultTerminal)}>
          <img src={AddIcon} alt="add-icon" className="add-icon" />
          <p className="add-text">{TextResources.TypeEditor_Properties_Add_Terminal}</p>
        </button>
        <p className="terminal-name" onClick={() => terminalsQuantity > 0 && setExpandCategory(!expandCategory)}>
          {name}
        </p>
        {terminalsQuantity > 0 && (
          <button className="delete-button" onClick={() => onChange("removeAll", defaultTerminal)}>
            <p className="delete-text">{TextResources.TypeEditor_Properties_Clear_All_Terminal}</p>
          </button>
        )}
      </TerminalCategoryWrapper>
      {terminalsQuantity > 0 && expandCategory && <AddTerminalWrapper>{showTerminals()}</AddTerminalWrapper>}
    </TerminalListElement>
  );
};
export default ObjectBlockElement;
