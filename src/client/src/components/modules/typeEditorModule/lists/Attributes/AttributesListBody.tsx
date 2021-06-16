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
        {/* {listElements &&
          listElements
            .filter((element) => element[1].aspect === state.aspect)
            .map((element) => (
              <>
                <AttributesListElement
                  key={element[1].id}
                  entity={element[1].entity}
                  qualifier={element[1].qualifier}
                  source={element[1].source}
                  condition={element[1].condition}
                />
              </>
            ))} */}
      </ListElementsContainer>
    </VerticalScrollbar>
  );
};

export default AttributesListBody;
