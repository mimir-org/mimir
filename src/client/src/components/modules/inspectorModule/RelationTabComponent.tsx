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
  height: 30%;
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
  function goToAspectNode(aspect) {
    console.log("Changing to aspect", aspect);
    alert("Cannot go to " + aspect + ": Not yet implemented.");
    /*if (aspect === "Location") {
      changeSelectedNode(node.location)
    } else if (aspect === "Product") {
      changeSelectedNode(node.product)
    } else if (aspect === "Function") {
      changeSelectedNode(node.function)
    }*/
  }
  return (
    <RelationColumns>
      <AspectList>
        <GoToAspectContainer>
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
        </GoToAspectContainer>
      </AspectList>
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
