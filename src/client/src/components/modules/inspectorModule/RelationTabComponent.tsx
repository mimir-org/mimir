import { Input, InputBox } from "../../../compLibrary";
import { InputWrapper } from "./styled";
import { RightArrowIcon } from "../../../assets/icons/common";
import { ConnectionList } from "./helpers";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveNode } from "../../../redux/store/project/actions";
import { RootState } from "../../../redux/store";
import { Project, Edge } from "../../../models";
import {
  RelationColumns,
  AspectList,
  ButtonGoToAspect,
} from "../../../compLibrary/box/inspector";
import styled from "styled-components";
import textResources from "../../../assets/textResources/textResources";

const GoToAspectContainer = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  height: 44px;
  font-size: 12px;
  width: 300px;
`;

const RelationTabComponent = ({ node }) => {
  const dispatch = useDispatch();
  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;
  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];

  const edgesFromSelectedNode = edges.filter(
    (e: Edge) => e.fromNodeId === node.id
  );
  const edgesToSelectedNode = edges.filter((e: Edge) => e.toNodeId === node.id);
  const inputNodes = nodes.filter((n) =>
    edgesToSelectedNode.some((e) => e.fromNodeId === n.id)
  );
  const outputNodes = nodes.filter((n) =>
    edgesFromSelectedNode.some((e) => e.toNodeId === n.id)
  );

  function changeSelectedNode(id) {
    dispatch(changeActiveNode(id, true));
  }
  function goToAspectNode(node) {
    alert("Cannot go to " + node.label + ": Not yet implemented.");
    console.log("Cannot go to " + node.label + ": Not yet implemented.");
    //changeSelectedNode(node.id);
  }
  interface aspectRelation {
    node: any;
    aspectRelation: string;
  }
  let aspectRelationList: aspectRelation[] = [
    //this is just examples of aspect-relations to fill the list
    {
      node: {
        label: "Example Room 2",
        id: 0,
      },
      aspectRelation: "Location",
    },
    {
      node: {
        label: "Product 1",
        id: 1,
      },
      aspectRelation: "Product",
    },
    {
      node: {
        label: "Room 2",
        id: 2,
      },
      aspectRelation: "Function",
    },
    {
      node: {
        label: "Room 2",
        id: 3,
      },
      aspectRelation: "Function",
    },
  ];

  return (
    <RelationColumns>
      {aspectRelationList.length > 0 && (
        <AspectList count={aspectRelationList.length}>
          {aspectRelationList.map((r) => (
            <GoToAspectContainer key={r.node.id}>
              <div>
                {r.aspectRelation === "Location"
                  ? textResources.Inspector_Relations_Part_Location
                  : r.aspectRelation === "Product"
                  ? textResources.Inspector_Relations_Fulfilled_By
                  : r.aspectRelation === "Function"
                  ? textResources.Inspector_Relations_Has_Function
                  : ""}
              </div>
              <InputBox>
                <InputWrapper width="50%">
                  <Input value={r.node.label} disabled={true} />
                </InputWrapper>
                <InputWrapper width="126px">
                  <ButtonGoToAspect onClick={() => goToAspectNode(r.node)}>
                    <span>
                      {r.aspectRelation === "Location"
                        ? textResources.Inspector_Relations_Location
                        : r.aspectRelation === "Product"
                        ? textResources.Inspector_Relations_Product
                        : r.aspectRelation === "Function"
                        ? textResources.Inspector_Relations_Function
                        : ""}
                    </span>
                    <img src={RightArrowIcon} alt="right-arrow-icon" />
                  </ButtonGoToAspect>
                </InputWrapper>
              </InputBox>
            </GoToAspectContainer>
          ))}
          {/* <GoToAspectContainer>
          <div>{textResources.Inspector_Relations_Part_Location}</div>
          <InputBox>
            <InputWrapper width="45%">
              <Input value="Room 2" disabled={true} />
            </InputWrapper>
            <InputWrapper width="45%">
              <ButtonGoToAspect onClick={() => goToAspectNode("Location")}>
                <span>{textResources.Inspector_Relations_Location}</span>
                <img src={RightArrowIcon} alt="right-arrow-icon" />
              </ButtonGoToAspect>
            </InputWrapper>
          </InputBox>
        </GoToAspectContainer>
        <GoToAspectContainer>
          <div>{textResources.Inspector_Relations_Fulfilled_By}</div>
          <InputBox>
            <InputWrapper width="45%">
              <Input value="Product 1" disabled={true} />
            </InputWrapper>
            <InputWrapper width="45%">
              <ButtonGoToAspect onClick={() => goToAspectNode("Product")}>
                <span>{textResources.Inspector_Relations_Product}</span>
                <img src={RightArrowIcon} alt="right-arrow-icon" />
              </ButtonGoToAspect>
            </InputWrapper>
          </InputBox>
        </GoToAspectContainer>
        <GoToAspectContainer>
          <div>{textResources.Inspector_Relations_Has_Function}</div>
          <InputBox>
            <InputWrapper width="45%">
              <Input value="Room 2" disabled={true} />
            </InputWrapper>
            <InputWrapper width="45%">
              <ButtonGoToAspect onClick={() => goToAspectNode("Function")}>
                <span>{textResources.Inspector_Relations_Function}</span>
                <img src={RightArrowIcon} alt="right-awwow-icon" />
              </ButtonGoToAspect>
            </InputWrapper>
          </InputBox>
        </GoToAspectContainer> */}
        </AspectList>
      )}
      <ConnectionList
        nodes={inputNodes}
        onElementClick={changeSelectedNode}
        title={textResources.Inspector_Relations_Input_object_connetion}
      />
      <ConnectionList
        nodes={outputNodes}
        onElementClick={changeSelectedNode}
        title={textResources.Inspector_Relations_Output_object_connetion}
      />
    </RelationColumns>
  );
};
export default RelationTabComponent;
