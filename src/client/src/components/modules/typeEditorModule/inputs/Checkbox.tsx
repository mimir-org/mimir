import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { updateAttributesList } from "../../../../redux/store/typeEditor/actions";
import "./checkbox.scss";

interface Props {
  attributeId: string;
}

export const Checkbox = ({ attributeId }: Props) => {
  const dispatch = useDispatch();

  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  let isSelected =
    state.createLibraryType.attributeTypes &&
    state.createLibraryType.attributeTypes.includes(attributeId);

  const handleCheckboxChange = () => {
    let attributesArray = state.createLibraryType.attributeTypes;
    let temp: string[];
    if (attributeId && isSelected) {
      temp = attributesArray.filter((a) => a !== attributeId);
      dispatch(updateAttributesList(temp));
    } else if (attributeId && !isSelected && attributesArray) {
      attributesArray.push(attributeId);
      dispatch(updateAttributesList(attributesArray));
    }
  };
  return (
    <label className={"squarecheckbox"}>
      <input
        type="checkbox"
        defaultChecked={isSelected}
        id={attributeId}
        onChange={handleCheckboxChange}
      />
      <span className="scheckmark"></span>
      <label htmlFor={attributeId}></label>
    </label>
  );
};

export default Checkbox;
