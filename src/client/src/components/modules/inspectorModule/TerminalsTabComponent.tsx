import { AttributesList } from "../typeEditorModule"
import {ActiveTerminalTypeList, AttributesContainer} from "./helpers"
const TerminalsTabComponent = () => {
 
  return (
    <>
    <ActiveTerminalTypeList
    terminals={[]}
    title="Active Terminal Types"
    onElementClick={()=>{}}
    />
    <AttributesContainer
    attributes={[]}
    />
    </>
  )
};

export default TerminalsTabComponent;
