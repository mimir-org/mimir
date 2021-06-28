import GetInspectorTextResource from "../helpers/GetInspectorTextResources";
import { useCallback } from "react";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { useDispatch, useSelector } from "react-redux";
import { changeInspectorTab } from "../../../../redux/store/inspector/actions";
import { Edge } from "../../../../models";
import { TabEdgeContent } from ".";
import {
  TabHeader,
  TabBody,
  NodeTitle,
  TabTitle,
} from "../../../../compLibrary/box/inspector";

interface Props {
  edge?: Edge;
  index: number;
}

const TabEdgeComponent = ({ edge, index }: Props) => {
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
        {index === 0 && edge && <NodeTitle>{edge.id}</NodeTitle>}
        {!edge && index === 1 && (
          <>
            <span>{typeEditorState.createLibraryType.name} </span>
          </>
        )}
        <TabTitle active={true}>{GetInspectorTextResource(index)}</TabTitle>
      </TabHeader>

      <TabBody>
        <TabEdgeContent edge={edge} index={index} />
      </TabBody>
    </>
  ) : (
    <TabHeader onClick={handleClick}>
      {index === 0 && edge && <NodeTitle>{edge.id}</NodeTitle>}
      {!edge && index === 1 && (
        <>
          <span>{typeEditorState.createLibraryType.name} </span>
        </>
      )}
      <TabTitle>{GetInspectorTextResource(index)}</TabTitle>
    </TabHeader>
  );
};

export default TabEdgeComponent;
