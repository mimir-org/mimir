import { RelationColumns, AspectList, ButtonGoToAspect } from "../../../componentLibrary/box/inspector";
import { Input, InputBox, AttributeField } from "../../../componentLibrary";
import { InputWrapper } from "./styled";
import { RightArrowIcon } from "../../../assets/icons/common";
import { ConnectionList } from "./helpers";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveNode } from "../../../redux/store/project/actions";
import { RootState } from "../../../redux/store";
import { Project, Edge} from "../../../models/project";
import { changeSelectedAspect } from "../../../redux/store/typeEditor/actions";

const RelationTabComponent = ({node}) => {
    const dispatch = useDispatch();
    const project = useSelector<RootState>(
        (state) => state.projectState.project
      ) as Project;
    const nodes = project?.nodes ?? [];
    const edges = project?.edges ?? [];

    const edgesFromSelectedNode = edges.filter((e: Edge) =>  
        e.fromNode === node.id
    );
    const edgesToSelectedNode = edges.filter((e: Edge) => 
        e.toNode === node.id
    );
    const inputNodes = nodes.filter(n => edgesToSelectedNode.some(e => e.fromNode === n.id))
    const outputNodes = nodes.filter(n => edgesFromSelectedNode.some(e => e.toNode === n.id))
    
    function changeSelectedNode(id){
        dispatch(changeActiveNode(id, true));
    }
    function goToAspect(aspect){
        console.log("Changing to aspect", aspect);
        //dispatch(changeSelectedAspect(aspect)); 
      }
    return (
        <RelationColumns>
        <AspectList>
            <AttributeField>
                <div>Part of Location</div>
                <InputBox>
                    <InputWrapper
                    width="50%">
                    <Input
                        value="Room 2"
                        disabled={true}
                        />
                    </InputWrapper>
                    <InputWrapper
                    width="50%">
                    <ButtonGoToAspect><span>Go to location</span><img src={RightArrowIcon} alt="right-arrow-icon"/></ButtonGoToAspect>
                    </InputWrapper>
                </InputBox>
            </AttributeField>
            <AttributeField>
                <div>Fulifilled by </div>
                <InputBox>
                    <InputWrapper
                    width="50%">
                        <Input
                        value="Product 1"
                        disabled={true}
                        />
                    </InputWrapper>
                    <InputWrapper
                    width="50%">
                    <ButtonGoToAspect><span>Go to product</span><img src={RightArrowIcon} alt="right-arrow-icon"/></ButtonGoToAspect>
                    </InputWrapper>
                </InputBox>
            </AttributeField>
            <AttributeField>
                <div>Has Function</div>
                <InputBox>
                    <InputWrapper
                    width="50%">
                        <Input
                            value="Room 2"
                            disabled={true}
                            />
                        </InputWrapper>
                    <InputWrapper
                    width="50%">
                        <ButtonGoToAspect onClick={()=>goToAspect("Function")}><span>Go to function</span><img src={RightArrowIcon} alt="right-awwow-icon"/></ButtonGoToAspect>
                    </InputWrapper>
                </InputBox>
            </AttributeField>
        </AspectList>
        <ConnectionList
            nodes={inputNodes}
            onElementClick={changeSelectedNode}
            title={"Input object connection"}/>
        <ConnectionList
            nodes={outputNodes}
            onElementClick={changeSelectedNode}
            title={"Output object connection"}/>
        </RelationColumns>
    );
};
export default RelationTabComponent;