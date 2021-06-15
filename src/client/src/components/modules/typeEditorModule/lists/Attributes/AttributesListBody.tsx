import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import { TypeEditorState } from "../../../../../redux/store/typeEditor/types";

import { ListElementsContainer } from "../../../../../compLibrary";
import { VerticalScrollbar } from "../../../../../compLibrary";
import { AttributesListElement } from "../Attributes/AttributesListElement";

interface Props {
  listElements: any;
}

export const AttributesListBody = ({ listElements }: Props) => {
  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  return (
    <VerticalScrollbar height={200}>
      <ListElementsContainer>
        {listElements
          ?.filter((element) => element[1].aspect === state.aspect)
          .map((element) => (
            <>
              {console.log(element)}
              <AttributesListElement
                key={element[0]}
                name={element[1].entity}
              />
            </>
          ))}
      </ListElementsContainer>
    </VerticalScrollbar>
  );
};

export default AttributesListBody;
