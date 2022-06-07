import { memo, useEffect, useState } from "react";
import { LibraryCategory } from "../../../../../../../../models/project";
import { Dispatch } from "redux";
import { NodeElement } from "./NodeElement";
import { CollectionsActions } from "../../../../../../../../models";
import { NodeCollectionButton, NodeCollectionButtonText, NodeCollectionContainer } from "./NodeCollection.styled";
import { TextResources } from "../../../../../../../../assets/text/TextResources";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

interface Props {
  collectionState: CollectionsActions;
  customCategory: LibraryCategory;
  category: LibraryCategory;
  selectedLibNode: NodeLibCm | null;
  setSelectedLibNode: (value: NodeLibCm) => void;
  dispatch: Dispatch;
  searchList?: LibraryCategory[];
  selectedLibNodes: NodeLibCm[];
  setSelectedLibNodes: (array: NodeLibCm[]) => void;
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
  selectedLibNode,
  setSelectedLibNode,
  dispatch,
  searchList,
  selectedLibNodes,
  setSelectedLibNodes,
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
              selectedLibNode={selectedLibNode}
              setSelectedLibNode={setSelectedLibNode}
              isCustomCategory={isCustomCategory}
              dispatch={dispatch}
              selectedLibNodes={selectedLibNodes}
              setSelectedLibNodes={setSelectedLibNodes}
              collectionState={collectionState}
            />
          );
        })}
    </NodeCollectionContainer>
  );
};

export default memo(NodeCollection);
