import { ButtonContainer, InspectorLockSpinner } from "./InspectorButton.styled";
import { GetButtonIcon, GetButtonText } from "./helpers";
import { Tooltip } from "../../tooltip/Tooltip";
import { Spinner } from "../../spinner";

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
  const showSpinner = disabled && (type === InspectorButtonType.Unlock || type === InspectorButtonType.Lock);

  return (
    <Tooltip content={description} disabled={disabled} offset={[0, 10]}>
      <ButtonContainer onClick={() => onClick()} disabled={disabled}>
        {GetButtonText(type)}
        {showSpinner ? (
          <InspectorLockSpinner>
            <Spinner variant="small" />
          </InspectorLockSpinner>
        ) : (
          GetButtonIcon(type)
        )}
      </ButtonContainer>
    </Tooltip>
  );
};

export default InspectorButton;
