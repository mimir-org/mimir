import { useState, useEffect } from "react";
import { ExpandIcon, CollapseIcon } from "../../assets/icons/chevron";
import { DropdownContainer, DropdownHeader, DropdownList } from "..";
import { ConnectorType } from "../../models";

interface Props {
  defaultValue?: ConnectorType;
  onChange: Function;
}

const DirectionalDropdown = ({ defaultValue, onChange }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selected, setSelected] = useState(ConnectorType[ConnectorType.Input]);
  const stringIsNumber = (v) => isNaN(Number(v)) === false;

  useEffect(() => {
    if (defaultValue) {
      setSelected(ConnectorType[defaultValue]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  return (
    <DropdownContainer>
      <label htmlFor="direction" />
      <DropdownHeader onClick={() => setIsListOpen(!isListOpen)}>
        <p>{selected}</p>
        <img
          src={isListOpen ? ExpandIcon : CollapseIcon}
          alt="expand-icon"
          onClick={(e) => setIsListOpen(!isListOpen)}
          className="icon"
        />
      </DropdownHeader>

      {isListOpen && (
        <DropdownList>
          {Object.keys(ConnectorType)
            .filter(stringIsNumber)
            .map((item) => {
              return (
                <div
                  key={item}
                  className="dropdown_listitem"
                  onClick={() => {
                    setSelected(ConnectorType[item]);
                    setIsListOpen(false);
                    onChange(item);
                  }}
                >
                  {ConnectorType[item]}
                </div>
              );
            })}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default DirectionalDropdown;
