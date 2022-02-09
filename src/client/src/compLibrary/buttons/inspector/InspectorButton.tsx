import { ButtonContainer } from "./styled";
import { useState } from "react";
import { GetActiveButtonIcon, GetButtonIcon, GetButtonText } from "./helpers";
import { Tooltip } from "../../tooltip/Tooltip";

interface Props {
  onClick: () => void;
  type: InspectorButtonType;
  description?: string;
  disabled?: boolean;
}

export enum InspectorButtonType {
  Validate,
  ValidateCorrect,
  Lock,
  Unlock,
  Delete,
  DeleteDisabled,
}

/**
 * Component for buttons in the Inspector Module.
 * @param interface
 * @returns a button to be used in the Inspector Header.
 */
const InspectorButton = ({ onClick, type, description, disabled }: Props) => {
  const [active, setActive] = useState(false);

  return (
    <Tooltip content={description} disabled={disabled} offset={[0, 10]}>
      <ButtonContainer
        onClick={() => onClick()}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
        onMouseLeave={() => setActive(false)}
        disabled={disabled}
      >
        {GetButtonText(type)}
        {active ? GetActiveButtonIcon(type) : GetButtonIcon(type)}
      </ButtonContainer>
    </Tooltip>
  );
};

export default InspectorButton;
