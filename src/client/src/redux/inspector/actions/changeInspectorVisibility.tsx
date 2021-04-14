import { INSPECTOR_VISIBILITY_CHANGED_COMPLETED } from "../reducers/inspectorReducer";

interface Props {
  index: number;
  list: [];
}

export function changeInspectorVisibility({ index, list }: Props) {
  if (list.length > 1) {
    list.forEach((element: { visible: boolean }) => {
      element.visible = false;
    });
    list[index].visible = true;
  }

  return {
    type: INSPECTOR_VISIBILITY_CHANGED_COMPLETED,
    payload: list,
  };
}
