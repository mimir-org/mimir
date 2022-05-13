import { memo, useEffect, useState } from "react";
import { LibraryCategory } from "../../../../../../../../models/project";
import { Dispatch } from "redux";
import { NodeElement } from "./NodeElement";
import { CollectionsActions, LibItem } from "../../../../../../../../models";
import { NodeCollectionButton, NodeCollectionButtonText, NodeCollectionContainer } from "./NodeCollection.styled";
import { TextResources } from "../../../../../../../../assets/text/TextResources";

interface Props {
  collectionState: CollectionsActions;
  customCategory: LibraryCategory;
  category: LibraryCategory;
  selectedElement: LibItem | null;
  setSelectedElement: (value: LibItem) => void;
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
  dispatch,
  searchList,
  selectedTypes,
  setSelectedTypes,
}: Props) => {
  const [expanded, setExpanded] = useState(true);
  const isCustomCategory = category.name === TextResources.FAVORITES;

  useEffect(() => {
    if (searchList && searchList.length > 0 && searchList.includes(category)) {
      setExpanded(true);
    }
  }, [category, searchList]);

  return (
    <NodeCollectionContainer isOpen={expanded}>
      <NodeCollectionButton isOpen={expanded} onClick={() => setExpanded(!expanded)}>
        <NodeCollectionButtonText isOpen={expanded}>{category.name}</NodeCollectionButtonText>
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
