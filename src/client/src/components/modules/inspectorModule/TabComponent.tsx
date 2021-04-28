import GetInspectorTextResource from "./helpers/GetInspectorTextResources";
import { TabContent } from "./";
import { useCallback } from "react";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changeInspector } from "../../../redux/store/inspector/actions";
import { Attribute } from "../../../models/project";
import {
  TabHeader,
  TabDataWrapper,
  TabContainer,
  NodeTitle,
  TabTitle,
} from "./styled";

interface Props {
  attributes: Attribute[];
  index: number;
  nodeLabel?: string;
}

const TabComponent = ({ attributes, index, nodeLabel }: Props) => {
  const dispatch = useDispatch();
  const list = useSelector<RootState>((state) => state.inspector.tabs);

  const isOpen = useSelector<RootState>(
    (state) => state.inspector.tabs[index].visible
  );

  const handleClick = useCallback(() => {
    dispatch(changeInspector(index, list));
  }, [dispatch, index, list]);

  return (
    <>
      {isOpen ? (
        <>
          <TabHeader active={true} onClick={handleClick}>
            {index === 0 && <NodeTitle>{nodeLabel}</NodeTitle>}
            <TabTitle active={true}>{GetInspectorTextResource(index)}</TabTitle>
          </TabHeader>
          <TabDataWrapper>
            <TabContainer>
              <TabContent attributes={attributes} columns={4} />
            </TabContainer>
          </TabDataWrapper>
        </>
      ) : (
        <TabHeader onClick={handleClick}>
          {index === 0 && <NodeTitle>{nodeLabel}</NodeTitle>}
          <TabTitle>{GetInspectorTextResource(index)}</TabTitle>
        </TabHeader>
      )}
    </>
  );
};

export default TabComponent;
