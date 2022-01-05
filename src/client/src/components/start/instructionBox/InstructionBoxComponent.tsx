import { TextResources } from "../../../assets/text";
import { InstructionProjectMenu, InstructionTextBox } from "./styled";

/** Instruction to user to open project menu to continue using Mìmir
 * @returns the dialog box pointing upwards to project menu
 */

export const InstructionBoxComponent = () => (
  <InstructionProjectMenu>
    <div className="arrow">
      <div className="curve"></div>
      <div className="point"></div>
    </div>
    <InstructionTextBox>
      <p>{TextResources.Project_Menu_Instruction}</p>
    </InstructionTextBox>
  </InstructionProjectMenu>
);

export default InstructionBoxComponent;
