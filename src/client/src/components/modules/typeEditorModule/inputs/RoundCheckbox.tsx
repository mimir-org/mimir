import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { changeRDS } from "../../../../redux/store/typeEditor/actions";
import "./roundcheckbox.scss";
interface Props {
  id: string;
  label: string;
}

export const RoundCheckbox = ({ id, label }: Props) => {
  const dispatch = useDispatch();

  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  let isSelected = state.createLibraryType.rdsId === id ?? false;

  const handleCheckboxChange = () => {
    if (label === "rds") {
      dispatch(changeRDS(id));
    }
  };

  return (
    <>
      <label className={"roundcheckbox"}>
        <input
          type="checkbox"
          checked={isSelected}
          id={id}
          onChange={handleCheckboxChange}
        />
        <span className="checked"></span>
        <label htmlFor={id}></label>
      </label>
    </>
  );
};

export default RoundCheckbox;
