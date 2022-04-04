import { useState } from "react";
import { AddTerminalComponent } from "../";
import { CreateId } from "../../../components/flow/helpers";
import { AddIcon } from "../../../assets/icons/type";
import { ConnectorType, TerminalType, TerminalTypeItem } from "../../../models";
import { AddTerminalWrapper, TerminalCategoryWrapper, TerminalListElement } from "../../styled";
import { OnTerminalCategoryChangeFunction, TerminalCategoryChangeKey } from "../../types";
import { TypeEditorTextResources } from "../../assets/TypeEditorTextResources";

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

  const onCategoryAdd = () => {
    setExpandCategory(true);
    onChange("add", {
      terminalId: CreateId(),
      terminalTypeId: "",
      selected: false,
      connectorType: ConnectorType.Input,
      number: 1,
      categoryId: categoryId,
    });
  };

  const onCategoryUpdateOrRemove = (key: TerminalCategoryChangeKey, terminal: TerminalTypeItem) => {
    onChange(key, terminal);
  };

  const showTerminals = () => {
    if (terminalsQuantity > 0) {
      return defaultTerminals.map((t) => {
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
        <button onClick={() => onCategoryAdd()}>
          <img src={AddIcon} alt="add-icon" className="add-icon" />
          <p className="add-text">{TypeEditorTextResources.PROPERTIES_ADD_TERMINAL}</p>
        </button>
        <p className="terminal-name" onClick={() => terminalsQuantity > 0 && setExpandCategory(!expandCategory)}>
          {name}
        </p>
        {terminalsQuantity > 0 && (
          <button className="delete-button" onClick={() => onChange("removeAll", defaultTerminals[0])}>
            <p className="delete-text">{TypeEditorTextResources.PROPERTIES_CLEAR_ALL_TERMINAL}</p>
          </button>
        )}
      </TerminalCategoryWrapper>
      {terminalsQuantity > 0 && expandCategory && <AddTerminalWrapper>{showTerminals()}</AddTerminalWrapper>}
    </TerminalListElement>
  );
};
export default ObjectBlockElement;
