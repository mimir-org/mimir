import { memo, useEffect, useState } from "react";
import { LibraryCategory } from "../../../../../../../../models/project";
import { Dispatch } from "redux";
import { NodeElement } from "./NodeElement";
import { CollectionsActions, LibItem, ObjectType } from "../../../../../../../../models";
import { NodeCollectionButton, LibCategoryHeader, NodeCollectionContainer } from "./NodeCollection.styled";

interface Props {
  collectionState: CollectionsActions;
  customCategory: LibraryCategory;
  category: LibraryCategory;
  selectedElement: string;
  setSelectedElement: (value: string) => void;
  setSelectedElementType: (value: ObjectType) => void;
  dispatch: Dispatch;
  searchList?: LibraryCategory[];
  selectedTypes: LibItem[];
  setSelectedTypes: (array: LibItem[]) => void;
}

/**
 * Component for a Category in the Library in Mimir.
 * @param interface
 * @returns a drop-down menu of a given Category.
 */
export const NodeCollection = ({
  collectionState,
  category,
  customCategory,
  selectedElement,
  setSelectedElement,
  setSelectedElementType,
  dispatch,
  searchList,
  selectedTypes,
  setSelectedTypes,
}: Props) => {
  const [expanded, setExpanded] = useState(true);
  const isCustomCategory = category.name === "Favorites";

  useEffect(() => {
    if (searchList && searchList.length > 0 && searchList.includes(category)) {
      setExpanded(true);
    }
  }, [category, searchList]);

  return (
    <NodeCollectionContainer isOpen={expanded}>
      <NodeCollectionButton isOpen={expanded} onClick={() => setExpanded(!expanded)}>
        <LibCategoryHeader isOpen={expanded}>{category.name}</LibCategoryHeader>
      </NodeCollectionButton>
      {expanded &&
        category?.nodes.map((item) => {
          return (
            <NodeElement
              key={item.id}
              item={item}
              customCategory={customCategory}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              setSelectedElementType={setSelectedElementType}
              isCustomCategory={isCustomCategory}
              dispatch={dispatch}
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              collectionState={collectionState}
            />
          );
        })}
    </NodeCollectionContainer>
  );
};

export default memo(NodeCollection);
