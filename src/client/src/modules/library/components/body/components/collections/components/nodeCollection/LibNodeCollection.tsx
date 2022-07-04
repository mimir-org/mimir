import { memo, useEffect, useState } from "react";
import { LibraryCategory } from "../../../../../../../../models/project";
import { Dispatch } from "redux";
import { LibNodeElement } from "./LibNodeElement";
import { CollectionsActions } from "../../../../../../../../models";
import { LibNodeCollectionButton, LibNodeCollectionButtonText, LibNodeCollectionBox } from "./LibNodeCollection.styled";
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
export const LibNodeCollection = ({
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

  useEffect(() => {
    if (searchList?.length && searchList.includes(category)) setExpanded(true);
  }, [category, searchList]);

  return (
    <LibNodeCollectionBox isOpen={expanded}>
      <LibNodeCollectionButton isOpen={expanded} onClick={() => setExpanded(!expanded)}>
        <LibNodeCollectionButtonText isOpen={expanded}>{category.name}</LibNodeCollectionButtonText>
      </LibNodeCollectionButton>
      {expanded &&
        category?.nodes.map((item) => {
          return (
            <LibNodeElement
              key={item.id}
              item={item}
              customCategory={customCategory}
              selectedLibNode={selectedLibNode}
              setSelectedLibNode={setSelectedLibNode}
              dispatch={dispatch}
              selectedLibNodes={selectedLibNodes}
              setSelectedLibNodes={setSelectedLibNodes}
              collectionState={collectionState}
            />
          );
        })}
    </LibNodeCollectionBox>
  );
};

export default memo(LibNodeCollection);
