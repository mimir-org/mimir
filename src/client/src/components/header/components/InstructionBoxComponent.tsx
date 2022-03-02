import { TextResources } from "../../../assets/text";
import {
  InstructionArrowContainer,
  InstructionArrowCurve,
  InstructionArrowPoint,
  InstructionProjectMenu,
  InstructionText,
  InstructionTextBox,
} from "./InstructionBoxComponent.styled";

/**
 * Instruction to user to open project menu to continue using Mìmir
 * @returns the dialog box pointing upwards to project menu
 */

const InstructionBoxComponent = () => (
  <InstructionProjectMenu>
    <InstructionArrowContainer>
      <InstructionArrowCurve />
      <InstructionArrowPoint />
    </InstructionArrowContainer>
    <InstructionTextBox>
      <InstructionText>{TextResources.Project_Menu_Instruction}</InstructionText>
    </InstructionTextBox>
  </InstructionProjectMenu>
);

export default InstructionBoxComponent;
