import { Attribute } from "@mimirorg/modelbuilder-types";
import { MinusIcon, PlusIcon } from "../../../../../../../../../../../assets/icons/controls";
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
  onRemoveAttribute: (attributeId: string) => void;
  onAddAttribute: (attributeTypeId: string) => void;
}

/**
 * Component for the row of buttons in the Attribute's header
 * @param props
 * @returns attribute buttons.
 */
export const AttributeButtonsComponent = ({
  attribute,
  headerColor,
  attributeIsLocking,
  onLock,
  onRemoveAttribute,
  onAddAttribute,
}: Props) => {
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
          <AttributeButton onClick={() => onAddAttribute(attribute.attributeTypeId)}>
            <VisuallyHidden>{TextResources.PARAMS_CLOSE}</VisuallyHidden>
            <PlusIcon style={{ fill: "#black" }} />
          </AttributeButton>
          <AttributeButton onClick={() => onRemoveAttribute(attribute.id)}>
            <VisuallyHidden>{TextResources.PARAMS_CLOSE}</VisuallyHidden>
            <MinusIcon style={{ fill: "#black" }} />
          </AttributeButton>
        </>
      )}
    </>
  );
};
