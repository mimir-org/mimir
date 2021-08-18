import "./roundcheckbox.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import {
  chooseRDS,
  chooseRDSName,
} from "../../../../redux/store/typeEditor/actions";
import { ModeEdit } from "../helpers";

interface Props {
  id: string;
  name?: string;
  label: string;
}

export const RoundCheckbox = ({ id, name, label }: Props) => {
  const dispatch = useDispatch();
  const state = useSelector<RootState>((s) => s.typeEditor) as TypeEditorState;
  const mode = state.mode;

  let isSelected = () => {
    if (label === "rds") {
      if (ModeEdit(mode)) {
        return state.selectedNode.rdsId === id;
      } else {
        return state.createLibraryType.rdsId === id;
      }
    } else if (label === "terminal") {
      return state.terminalCategory === id;
    }
  };

  const onCheckboxChange = () => {
    if (id !== "" && id) {
      if (label === "rds") {
        dispatch(chooseRDS(state.mode, id));
        dispatch(chooseRDSName(name));
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
