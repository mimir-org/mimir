import "./roundcheckbox.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { setRDS, setRDSName } from "../../../../redux/store/typeEditor/actions";

interface Props {
  id: string;
  name?: string;
  label: string;
}

export const RoundCheckbox = ({ id, name, label }: Props) => {
  const dispatch = useDispatch();
  const state = useSelector<RootState>((s) => s.typeEditor) as TypeEditorState;

  let isSelected = () => {
    if (label === "rds") {
      return state.createLibraryType.rdsId === id;
    } else if (label === "terminal") {
      return state.terminalCategory === id;
    }
  };

  const onCheckboxChange = () => {
    if (id !== "" && id) {
      if (label === "rds") {
        dispatch(setRDS(id));
        dispatch(setRDSName(name));
      }
    }
  };

  return (
    <label className={"roundcheckbox"}>
      <input
        type="checkbox"
        checked={isSelected()}
        id={id}
        onChange={onCheckboxChange}
      />
      <span className="checked"></span>
      <label htmlFor={id}></label>
    </label>
  );
};

export default RoundCheckbox;
