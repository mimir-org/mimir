import GetInspectorTextResource from "./helpers/GetInspectorTextResources";
import { TabContent } from "./";
import { useCallback } from "react";
import { RootState } from "../../../redux/store";
import { TypeEditorState } from "../../../redux/store/typeEditor/types";
import { useDispatch, useSelector } from "react-redux";
import { changeInspectorTab } from "../../../redux/store/inspector/actions";
import { Node } from "../../../models";
import {
  TabHeader,
  TabBody,
  NodeTitle,
  TabTitle,
} from "../../../compLibrary/box/inspector";

interface Props {
  node?: Node;
  index: number;
}

const TabComponent = ({ node, index }: Props) => {
  const dispatch = useDispatch();
  const isOpen = useSelector<RootState>(
    (state) => state.inspector.tabs[index]?.visible
  ) as boolean;

  const typeEditorState = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const handleClick = useCallback(() => {
    dispatch(changeInspectorTab(index));
  }, [dispatch, index]);

  return isOpen ? (
    <>
      <TabHeader active={true} onClick={handleClick}>
        {index === 0 && node && (
          <NodeTitle>{node.label ?? node.name}</NodeTitle>
        )}
        {!node && index === 1 && (
          <>
            <span>{typeEditorState.createLibraryType.name} </span>
          </>
        )}
        <TabTitle active={true}>{GetInspectorTextResource(index)}</TabTitle>
      </TabHeader>

      <TabBody>
        <TabContent node={node} index={index} />
      </TabBody>
    </>
  ) : (
    <TabHeader onClick={handleClick}>
      {index === 0 && node && <NodeTitle>{node.label ?? node.name}</NodeTitle>}
      {!node && index === 1 && (
        <>
          <span>{typeEditorState.createLibraryType.name} </span>
        </>
      )}
      <TabTitle>{GetInspectorTextResource(index)}</TabTitle>
    </TabHeader>
  );
};

export default TabComponent;
