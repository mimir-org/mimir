import "./roundcheckbox.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import {
  chooseRDS,
  chooseRDSName,
} from "../../../../redux/store/typeEditor/actions";
import { ModeEdit } from "../helpers";
import { useEffect } from "react";

interface Props {
  id: string;
  name?: string;
  label: string;
  defaultValue?: any;
}

export const RoundCheckbox = ({ id, name, label, defaultValue }: Props) => {
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
      if (ModeEdit(mode)) {
        return defaultValue.terminalCategory.name === id;
      } else {
        return state.terminalCategory === id;
      }
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

  useEffect(() => {
    if (ModeEdit(mode) && label === "rds" && id === state.selectedNode.rdsId) {
      dispatch(chooseRDSName(name));
    }
  }, [dispatch, label, name, mode, id, state.selectedNode.rdsId]);

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
