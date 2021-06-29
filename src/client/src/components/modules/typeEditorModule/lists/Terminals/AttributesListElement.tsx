import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { updatePredefinedAttributes } from "../../../../../redux/store/typeEditor/actions";
import { PredefinedAttribute } from "../../../../../models";

import {
  HelpIcon,
  ExpandedIcon,
  CollapsedIcon,
} from "../../../../../assets/icons/common";
import "./AddTerminal/directiondropdown.scss";
import {
  TerminalListElement,
  TerminalCategoryWrapper,
  AddTerminalWrapper,
} from "../../styled";
import "../../inputs/checkbox.scss";

interface Props {
  name: string;
  values: object;
  isMultiSelect: boolean;
}

export const AttributesListElement = ({
  name,
  values,
  isMultiSelect,
}: Props) => {
  const dispatch = useDispatch();

  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  let locationAttribute: PredefinedAttribute = {
    key: name,
    values: values,
    isMultiSelect: isMultiSelect,
  };

  let isSelected = state.createLibraryType.predefinedAttributes.some((a) => {
    return a.key === locationAttribute.key;
  });

  const handleCheckboxChange = () => {
    let locationAttributes = state.createLibraryType.predefinedAttributes;
    let temp: PredefinedAttribute[];
    if (locationAttribute) {
      if (isSelected) {
        temp = locationAttributes.filter(
          (a) => a.key !== locationAttribute.key
        );
        dispatch(updatePredefinedAttributes(temp));
      } else if (!isSelected) {
        locationAttributes.push(locationAttribute);
        dispatch(updatePredefinedAttributes(locationAttributes));
      }
    }
  };

  return (
    <TerminalListElement>
      <TerminalCategoryWrapper>
        <label className={"squarecheckbox"}>
          <input
            type="checkbox"
            defaultChecked={isSelected}
            id={name}
            onChange={handleCheckboxChange}
          />
          <span className="scheckmark"></span>
          <label htmlFor={name}></label>
        </label>
        <p className="locationAttribute">{name}</p>
        <img className="help-icon" src={HelpIcon} alt="help" />
      </TerminalCategoryWrapper>
      <div>test</div>
      {/* {category === selectedCategory ? (
            <div className="terminalSearchbarWrapper">
              <div className="terminalsearchbar_container">
                <div className="terminalsearchbar">
                  <label htmlFor="terminalsearch" />
                  <input
                    type="text"
                    value={searchbarInput}
                    placeholder="Search or Select Terminal Media Type"
                    onChange={handleChange}
                    onFocus={toggleTerminalList}
                  />
                  <img
                    src={expandList ? ExpandedIcon : CollapsedIcon}
                    alt="expand-icon"
                    onClick={toggleTerminalList}
                    className="icon"
                  />
                </div>
                {expandList && (
                  <div className="terminalsearchbarlist">
                    {terminals.map((t) => {
                      return (
                        <div
                          className="terminallistitem"
                          key={t.id}
                          onClick={() => {
                            handleTerminalClick(t.id, t.name, t.color);
                          }}
                        >
                          {t.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <img className="helpIcon" src={HelpIcon} alt="help" />
            </div>
          ) : null} */}
    </TerminalListElement>
  );
};

export default AttributesListElement;
