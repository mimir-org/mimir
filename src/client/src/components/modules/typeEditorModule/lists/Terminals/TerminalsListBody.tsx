import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";
import { VerticalScrollbar } from "../../../../../compLibrary";
import { TerminalsListElement } from "./TerminalsListElement";
import { Aspect } from "../../../../../models";
interface Props {
  listElements: any;
}

export const TerminalsListBody = ({ listElements }: Props) => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const filteredTerminals = () => {
    let tempList = listElements;
    if (state.createLibraryType.aspect !== Aspect.NotSet) {
      tempList = listElements
        .filter((element) =>
          element[1].attributes.some(
            (a) => a.aspect === state.createLibraryType.aspect
          )
        )
        .map((element) => {
          element[1].attributes = element[1].attributes.filter(
            (a) => a.aspect === state.createLibraryType.aspect
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
