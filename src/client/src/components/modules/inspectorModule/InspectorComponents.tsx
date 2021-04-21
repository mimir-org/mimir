import { GetNodes } from "../../flow/helpers";
import InspectorContent from "./InspectorContent";
import { useCallback } from "react";
import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { changeInspector } from "../../../redux/store/inspector/actions";
import { TabHeader, TabDataWrapper, TabContainer } from "./styled";

const InspectorComponents = () => {
  const index = 0;
  const dispatch = useDispatch();
  const header = "Admin Info";
  const list = useSelector<RootState>((state) => state.inspector.list);

  const handleClick = useCallback(() => {
    dispatch(changeInspector(index, list));
  }, [dispatch, index, list]);

  const isOpen = true;
  //useSelector<RootState>((state) => state.inspector.list[index].visible);

  const nodes = GetNodes();
  const node = nodes.find((node) => node.isSelected);

  return (
    <>
      {isOpen ? (
        <>
          <TabHeader active="true" onClick={handleClick}>
            {header}
          </TabHeader>
          <TabDataWrapper>
            <TabContainer>
              <InspectorContent node={node} />
            </TabContainer>
          </TabDataWrapper>
        </>
      ) : (
        <TabHeader onClick={handleClick}>{header}</TabHeader>
      )}
    </>
  );
};

export default InspectorComponents;
