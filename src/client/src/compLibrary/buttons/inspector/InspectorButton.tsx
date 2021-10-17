import { ButtonContainer } from "./styled";
import { GetButtonText, GetButtonIcon, GetActiveButtonIcon, GetButtonWidth } from "./helpers";
import { useState } from "react";

interface Props {
  onClick: () => void;
  type: InspectorButtonType;
  visible: boolean;
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
 * @param param0
 * @returns a button to be used in the Inspector Header.
 */
const InspectorButton = ({ onClick, type, visible, disabled }: Props) => {
  const [active, setActive] = useState(false);

  const icon = GetButtonIcon(type);
  const activeIcon = GetActiveButtonIcon(type);

  return (
    <ButtonContainer
      width={GetButtonWidth(type)}
      onClick={() => onClick()}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      onMouseLeave={() => setActive(false)}
      visible={visible}
      disabled={disabled}
    >
      <div>{GetButtonText(type)}</div>
      {active ? activeIcon : icon}
    </ButtonContainer>
  );
};

export default InspectorButton;
