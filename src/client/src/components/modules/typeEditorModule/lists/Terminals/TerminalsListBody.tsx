import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { VerticalScrollbar } from "../../../../../componentLibrary";
import { TerminalsListElement } from "./TerminalsListElement";
interface Props {
  listElements: any;
}

export const TerminalsListBody = ({ listElements }: Props) => {
  const dispatch = useDispatch();

  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const filteredTerminals = () => {
    let tempList = listElements;
    if (state.aspect !== "NotSet") {
      tempList = listElements
        .filter((element) =>
          element[1].attributes.some((a) => a.aspect == state.aspect)
        )
        .map((element) => {
          element[1].attributes = element[1].attributes.filter(
            (a) => a.aspect == state.aspect
          );
          return element;
        });
    }
    return tempList.map((element) => (
      <>
        <TerminalsListElement key={element[1].id} terminals={element[1]} />
      </>
    ));
  };
  return (
    <VerticalScrollbar height={200}>{filteredTerminals()}</VerticalScrollbar>
  );
};

export default TerminalsListBody;
