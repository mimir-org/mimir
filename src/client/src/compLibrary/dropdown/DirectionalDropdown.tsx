import { useState, useEffect } from "react";
import { ExpandIcon, CollapseIcon } from "../../assets/icons/common";
import { DropdownContainer, DropdownHeader, DropdownList } from "..";
import { ConnectorType } from "../../models";

interface Props {
  value?: ConnectorType;
  onChange: Function;
}

const DirectionalDropdown = ({ value, onChange }: Props) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [selected, setSelected] = useState(
    ConnectorType[ConnectorType.Input.toString()]
  );
  const stringIsNumber = (value) => isNaN(Number(value)) === false;

  useEffect(() => {
    if (value) {
      setSelected(ConnectorType[value.toString()]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <DropdownContainer>
        <label htmlFor="direction" />
        <DropdownHeader onClick={() => setIsListOpen(!isListOpen)}>
          <p>{selected}</p>
          <img
            src={isListOpen ? ExpandIcon : CollapseIcon}
            alt="expand-icon"
            onClick={(e) => setIsListOpen(!isListOpen)}
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
                      onChange(ConnectorType[item]);
                    }}
                  >
                    {ConnectorType[item]}
                  </div>
                );
              })}
          </DropdownList>
        )}
      </DropdownContainer>
    </>
  );
};

export default DirectionalDropdown;
