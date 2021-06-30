import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { updateAttributesList } from "../../../../redux/store/typeEditor/actions";
import "./checkbox.scss";

interface Props {
  label: string;
  id: string;
}

export const Checkbox = ({ label, id }: Props) => {
  const dispatch = useDispatch();

  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  let attributeIsSelected =
    label === "attribute" &&
    state.createLibraryType.attributeTypes &&
    state.createLibraryType.attributeTypes.includes(id);

  const handleCheckboxChange = () => {
    if (label === "attribute") {
      let attributesArray = state.createLibraryType.attributeTypes;
      let temp: string[];
      if (id && attributeIsSelected) {
        temp = attributesArray.filter((a) => a !== id);
        dispatch(updateAttributesList(temp));
      } else if (id && !attributeIsSelected && attributesArray) {
        attributesArray.push(id);
        dispatch(updateAttributesList(attributesArray));
      }
    }
  };
  return (
    <label className={"squarecheckbox"}>
      <input
        type="checkbox"
        defaultChecked={label === "attribute" && attributeIsSelected}
        id={id}
        onChange={handleCheckboxChange}
      />
      <span className="scheckmark"></span>
      <label htmlFor={id}></label>
    </label>
  );
};

export default Checkbox;
