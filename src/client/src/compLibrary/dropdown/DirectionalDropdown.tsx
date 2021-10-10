import { useState } from "react";
import { ExpandIcon, CollapseIcon } from "../../assets/icons/chevron";
import { DropdownContainer, DropdownHeader, DropdownList } from "..";
import { ConnectorType } from "../../models";

interface Props {
  value: number;
  onChange: Function;
}

const DirectionalDropdown = ({ value, onChange }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const stringIsNumber = (v: any) => isNaN(Number(v)) === false;

  return (
    <DropdownContainer>
      <label htmlFor="direction" />
      <DropdownHeader onClick={() => setIsListOpen(!isListOpen)}>
        <p>{ConnectorType[value]}</p>
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
                    setIsListOpen(false);
                    onChange(Number(item));
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
