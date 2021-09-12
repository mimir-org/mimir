import { Input, InputBox } from "../../../compLibrary";
import { GoToAspectContainer, InputWrapper } from "../styled";
import { RightArrowIcon } from "../../../assets/icons/common";
import { ConnectionList } from "../helpers";
import { useDispatch } from "react-redux";
import { setActiveNode } from "../../../redux/store/project/actions";
import { Project, Edge, Node } from "../../../models";
import { TextResources } from "../../../assets/text";
import {
  RelationColumns,
  AspectList,
  ButtonGoToAspect,
} from "../../../compLibrary/box/inspector";

interface Props {
  project: Project;
  node: Node;
}

const RelationComponent = ({ project, node }: Props) => {
  const dispatch = useDispatch();

  const nodes = project?.nodes ?? [];
  const edges = project?.edges ?? [];

  const edgesFromSelectedNode = edges.filter(
    (e: Edge) => e.fromNodeId === node.id
  );
  const edgesToSelectedNode = edges.filter((edge) => edge.toNodeId === node.id);
  const inputNodes = nodes.filter((n) =>
    edgesToSelectedNode.some((edge) => edge.fromNodeId === n.id)
  );
  const outputNodes = nodes.filter((n) =>
    edgesFromSelectedNode.some((edge) => edge.toNodeId === n.id)
  );

  function changeSelectedNode(id) {
    dispatch(setActiveNode(id, true));
  }
  function goToAspectNode(node) {
    alert("Cannot go to " + node.label + ": Not yet implemented.");
    console.log("Cannot go to " + node.label + ": Not yet implemented.");
    //changeSelectedNode(node.id);
  }

  interface AspectRelation {
    node: any;
    aspectRelation: string;
  }

  let aspectRelationList: AspectRelation[] = [
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
                {r.aspectRelation === "Location" &&
                  TextResources.Inspector_Relations_Part_Location}
                {r.aspectRelation === "Product" &&
                  TextResources.Relations_FulfilledBy}
                {r.aspectRelation === "Function" &&
                  TextResources.Relations_HasFunction}
              </div>
              <InputBox>
                <InputWrapper width="50%">
                  <Input value={r.node.label} disabled={true} />
                </InputWrapper>
                <InputWrapper width="126px">
                  <ButtonGoToAspect onClick={() => goToAspectNode(r.node)}>
                    <span>
                      {r.aspectRelation === "Location" &&
                        TextResources.Inspector_Relations_Location}
                      {r.aspectRelation === "Product" &&
                        TextResources.Inspector_Relations_Product}
                      {r.aspectRelation === "Function" &&
                        TextResources.Inspector_Relations_Function}
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
        title={TextResources.Inspector_Relations_Input_object_connetion}
      />
      <ConnectionList
        nodes={outputNodes}
        onElementClick={changeSelectedNode}
        title={TextResources.Inspector_Relations_Output_object_connetion}
      />
    </RelationColumns>
  );
};
export default RelationComponent;
