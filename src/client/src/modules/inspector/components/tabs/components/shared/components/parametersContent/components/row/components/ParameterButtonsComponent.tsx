import { Attribute } from "@mimirorg/modelbuilder-types";
import { CloseIcon } from "../../../../../../../../../../../assets/icons/close";
import { LockClosedParameterComponent, LockOpenComponent } from "../../../../../../../../../../../assets/icons/lock";
import { TextResources } from "../../../../../../../../../../../assets/text/TextResources";
import { Spinner } from "../../../../../../../../../../../compLibrary/spinner";
import { VisuallyHidden } from "../../../../../../../../../../../compLibrary/util";
import { ParameterButton, ParameterLockSpinner } from "../../../styled/ParameterButton";

interface Props {
  attribute: Attribute;
  headerColor: string;
  isAttribute: boolean;
  attributeIsLocking: boolean;
  isLocked: boolean;
  onLock: (attribute: Attribute, isLocked: boolean) => void;
  onClose: (id: string) => void;
}

/**
 * Component for the row of buttons in the Parameter's header
 * @param props
 * @returns parameter buttons.
 */
export const ParameterButtonsComponent = ({
  attribute,
  headerColor,
  isAttribute,
  attributeIsLocking,
  isLocked,
  onLock,
  onClose,
}: Props) => {
  if (!isAttribute) return null;
  const lockDescription = isLocked ? TextResources.PARAMS_UNLOCK : TextResources.PARAMS_LOCK;
  const LockComponent = isLocked ? <LockClosedParameterComponent fill={headerColor} /> : <LockOpenComponent />;

  return (
    <>
      <ParameterButton onClick={() => isAttribute && onLock(attribute, !attribute.isLocked)}>
        <VisuallyHidden>{lockDescription}</VisuallyHidden>
        {attributeIsLocking ? (
          <ParameterLockSpinner>
            <Spinner variant="small" />
          </ParameterLockSpinner>
        ) : (
          LockComponent
        )}
      </ParameterButton>
      <ParameterButton onClick={() => onClose(attribute.id)}>
        <VisuallyHidden>{TextResources.PARAMS_CLOSE}</VisuallyHidden>
        <img src={CloseIcon} alt="x mark" />
      </ParameterButton>
    </>
  );
};
