import { InspectorElement, InspectorAttributesElement } from "../../../../types";
import { GetAttributes } from "../shared/components/parametersContent/helpers/GetAttributes";
import { useState } from "react";
import { GetParametersColor } from "../shared/components/parametersContent/helpers/GetParametersColor";
import { AttributesBox } from "./AttributesComponent.styled";
import {
  isProjectStateGloballyLockingSelector,
  projectIdSelector,
  qunatityDatumSelector,
  usernameSelector,
  libraryAttributeTypeSelector,
} from "../../../../../../redux/store";
import { useAppSelector, useAppDispatch } from "store";
import { AttributeObject } from "../shared/components/parametersContent/components/row/components/AttributeObject";
import {
  OnAddNodeAttribute,
  OnChangeNodeAttributeValue,
  OnChangeNodeTerminalAttributeValue,
  OnRemoveNodeAttribute,
  OnRemoveNodeTerminalAttribute,
  OnAddNodeTerminalAttribute,
} from "../shared/components/parametersContent/handlers/OnChangeAttributeValue";
import { OnLockParameter } from "../shared/components/parametersContent/handlers/OnLockParameter";
import { AspectObject, Attribute, ConnectorTerminal } from "lib";

interface Props {
  attributesElem: InspectorAttributesElement;
  inspectorParentElem: InspectorElement;
  attributeItems?: Attribute[];
}

/**
 * Component for the Attributes in the Inspector. This component is used in the Attributes tab,
 * but also under Terminal Attributes to display a Terminal's attributes.
 * @param props
 * @returns a drop-down menu to select combinations of attributes, and buttons for hiding/showing all entities.
 */
export const AttributesComponent = ({ attributesElem, inspectorParentElem, attributeItems }: Props) => {
  const attributes = attributeItems ?? GetAttributes(attributesElem);
  const dispatch = useAppDispatch();
  const username = useAppSelector(usernameSelector);
  const isGlobalLocking = useAppSelector(isProjectStateGloballyLockingSelector);
  const [lockingAttribute, setLockingAttribute] = useState(null);
  const quantityDatums = useAppSelector(qunatityDatumSelector);
  const projectId = useAppSelector(projectIdSelector);
  const attributeTypes = useAppSelector(libraryAttributeTypeSelector);

  const handleAttributeChange = (attributeId: string, property: string, value: string) => {
    // Node attributes
    if (attributesElem instanceof AspectObject)
      OnChangeNodeAttributeValue(attributeId, attributesElem.id, property, value, dispatch);

    // Node terminal attributes
    if (attributesElem instanceof ConnectorTerminal && inspectorParentElem instanceof AspectObject) {
      OnChangeNodeTerminalAttributeValue(attributeId, inspectorParentElem.id, attributesElem.id, property, value, dispatch);
    }
  };

  // Remove attribute
  const onRemoveAttribute = (attributeId: string) => {
    // Remove Node attribute
    if (attributesElem instanceof AspectObject) OnRemoveNodeAttribute(attributeId, attributesElem.id, attributes, dispatch);

    // Remove Node terminal attribute
    if (attributesElem instanceof ConnectorTerminal && inspectorParentElem instanceof AspectObject) {
      OnRemoveNodeTerminalAttribute(attributeId, inspectorParentElem.id, attributesElem.id, attributes, dispatch);
    }
  };

  // Add attribute
  const onAddAttribute = (attributeTypeId: string) => {
    // Add node attribute
    if (attributesElem instanceof AspectObject) {
      OnAddNodeAttribute(attributeTypeId, attributesElem.id, attributeTypes, dispatch);
    }

    // Add Node terminal attribute
    if (attributesElem instanceof ConnectorTerminal && inspectorParentElem instanceof AspectObject) {
      OnAddNodeTerminalAttribute(attributeTypeId, inspectorParentElem.id, attributesElem.id, attributeTypes, dispatch);
    }
  };

  return (
    <>
      {attributesElem && attributes && (
        <AttributesBox>
          {Object.entries(attributes).map((attribute, index) => {
            const [headerColor, bodyColor] = GetParametersColor(index);

            return (
              <AttributeObject
                key={index}
                attribute={attribute[1]}
                headerColor={headerColor}
                bodyColor={bodyColor}
                isGloballyLocking={isGlobalLocking}
                lockingAttribute={lockingAttribute}
                quantityDatums={quantityDatums}
                onChange={(attributeId: string, property: string, value: string) =>
                  handleAttributeChange(attributeId, property, value)
                }
                onLock={(attr, isLocked) =>
                  OnLockParameter(inspectorParentElem, attr, projectId, isLocked, username, setLockingAttribute, dispatch)
                }
                onAddAttribute={onAddAttribute}
                onRemoveAttribute={onRemoveAttribute}
              />
            );
          })}
        </AttributesBox>
      )}
    </>
  );
};
