import GetInspectorTextResource from "./helpers/GetInspectorTextResources";
import { TabContent } from "./";
import { useCallback } from "react";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changeInspector } from "../../../redux/store/inspector/actions";
import { Attribute, Node } from "../../../models/project";
import {
  TabHeader,
  TabDataWrapper,
  TabContainer,
  NodeTitle,
  TabTitle,
  TabColumn,
} from "./styled";
import { Input } from "../../../componentLibrary";

interface Props {
  node: Node;
  index: number;
}

const TabAdminComponent = ({ node, index }: Props) => {
  const dispatch = useDispatch();
  const list = useSelector<RootState>(
    (state) => state.inspector.tabs
  ) as string[];

  const isOpen = useSelector<RootState>(
    (state) => state.inspector.tabs[index].visible
  ) as boolean;

  const handleClick = useCallback(() => {
    dispatch(changeInspector(index, list));
  }, [dispatch, index, list]);

  return isOpen ? (
    <>
      <TabHeader active={true} onClick={handleClick}>
        {node && <NodeTitle>{node.label ?? node.name}</NodeTitle>}
        <TabTitle active={true}>{GetInspectorTextResource(index)}</TabTitle>
      </TabHeader>
      <TabDataWrapper>
        <TabContainer>
          <TabColumn>
            <div>
              <div>Id</div>
              <Input
                value={node.updatedBy}
                onChange={() => null}
                inputType=""
              />
            </div>
            <div>
              <div>Updated by</div>
              <Input
                value={node.updatedBy}
                onChange={() => null}
                inputType=""
              />
            </div>
            <div>
              <div>Updated by</div>
              <Input
                value={node.updatedBy}
                onChange={() => null}
                inputType=""
              />
            </div>
          </TabColumn>
        </TabContainer>
      </TabDataWrapper>
    </>
  ) : (
    <TabHeader onClick={handleClick}>
      {node && <NodeTitle>{node.label ?? node.name}</NodeTitle>}
      <TabTitle>{GetInspectorTextResource(index)}</TabTitle>
    </TabHeader>
  );
};

export default TabAdminComponent;
