import { Attribute } from "@mimirorg/modelbuilder-types";
import { CloseIcon } from "../../../../../../../../../../../assets/icons/close";
import { LockClosedParameterComponent, LockOpenComponent } from "../../../../../../../../../../../assets/icons/lock";
import { TextResources } from "../../../../../../../../../../../assets/text/TextResources";
import { Spinner } from "../../../../../../../../../../../compLibrary/spinner";
import { VisuallyHidden } from "../../../../../../../../../../../compLibrary/util";
import { AttributeButton, AttributeLockSpinner } from "../../../styled/AttributeButton";

interface Props {
  attribute: Attribute;
  headerColor: string;
  attributeIsLocking: boolean;
  onLock: (attribute: Attribute, isLocked: boolean) => void;
  onClose: (id: string) => void;
}

/**
 * Component for the row of buttons in the Attribute's header
 * @param props
 * @returns attribute buttons.
 */
export const AttributeButtonsComponent = ({ attribute, headerColor, attributeIsLocking, onLock, onClose }: Props) => {
  const lockDescription = attribute?.isLocked ? TextResources.PARAMS_UNLOCK : TextResources.PARAMS_LOCK;
  const LockComponent = attribute?.isLocked ? <LockClosedParameterComponent fill={headerColor} /> : <LockOpenComponent />;

  return (
    <>
      {attribute && (
        <>
          <AttributeButton onClick={() => onLock(attribute, !attribute.isLocked)}>
            <VisuallyHidden>{lockDescription}</VisuallyHidden>
            {attributeIsLocking ? (
              <AttributeLockSpinner>
                <Spinner variant="small" />
              </AttributeLockSpinner>
            ) : (
              LockComponent
            )}
          </AttributeButton>
          <AttributeButton onClick={() => onClose(attribute.id)}>
            <VisuallyHidden>{TextResources.PARAMS_CLOSE}</VisuallyHidden>
            <img src={CloseIcon} alt="x mark" />
          </AttributeButton>
        </>
      )}
    </>
  );
};
