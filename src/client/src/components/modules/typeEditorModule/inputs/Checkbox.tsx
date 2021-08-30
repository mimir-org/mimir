import "./checkbox.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { chooseAttributeTypes } from "../../../../redux/store/typeEditor/actions";
import { ModeEdit } from "../helpers";

interface Props {
  label: string;
  id: string;
}

export const Checkbox = ({ label, id }: Props) => {
  const dispatch = useDispatch();
  const state = useSelector<RootState>((s) => s.typeEditor) as TypeEditorState;
  const mode = state.mode;
  const attributeTypes = ModeEdit(mode)
    ? state.selectedNode.attributeTypes
    : state.createLibraryType.attributeTypes;

  let attributeIsSelected = () => {
    if (label === "attribute") {
      if (ModeEdit(mode)) {
        return state.selectedNode.attributeTypes?.includes(id);
      } else {
        return state.createLibraryType.attributeTypes?.includes(id);
      }
    } else if (label === "terminal") {
      return state.terminalCategory === id;
    }
  };

  const onCheckboxChange = () => {
    if (label === "attribute") {
      let attributesArray = attributeTypes;
      let temp: string[];
      if (id && attributeIsSelected()) {
        temp = attributesArray.filter((a) => a !== id);
        dispatch(chooseAttributeTypes(state.mode, temp));
      } else if (id && !attributeIsSelected() && attributesArray) {
        attributesArray.push(id);
        dispatch(chooseAttributeTypes(state.mode, attributesArray));
      }
    }
  };
  return (
    <label className={"squarecheckbox"}>
      <input
        type="checkbox"
        defaultChecked={label === "attribute" && attributeIsSelected()}
        id={id}
        onChange={onCheckboxChange}
      />
      <span className="scheckmark"></span>
      <label htmlFor={id}></label>
    </label>
  );
};

export default Checkbox;
