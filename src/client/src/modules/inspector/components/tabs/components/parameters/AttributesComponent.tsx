import { InspectorElement, InspectorAttributesElement } from "../../../../types";
import { Attribute } from "@mimirorg/modelbuilder-types";
import { GetAttributes } from "../shared/components/parametersContent/helpers/GetAttributes";
import { useState } from "react";
import { GetParametersColor } from "../shared/components/parametersContent/helpers/GetParametersColor";
import { AttributesBox } from "./AttributesComponent.styled";
import {
  isProjectStateGloballyLockingSelector,
  projectIdSelector,
  qunatityDatumSelector,
  useAppDispatch,
  useAppSelector,
  usernameSelector,
  libraryAttributeTypeSelector,
} from "../../../../../../redux/store";
import { AttributeObject } from "../shared/components/parametersContent/components/row/components/AttributeObject";
import {
  OnAddNodeAttribute,
  OnChangeInterfaceAttributeValue,
  OnChangeInterfaceTerminalAttributeValue,
  OnChangeNodeAttributeValue,
  OnChangeNodeTerminalAttributeValue,
  OnChangeTransportAttributeValue,
  OnChangeTransportTerminalAttributeValue,
  OnRemoveNodeAttribute,
  OnRemoveNodeTerminalAttribute,
  OnAddNodeTerminalAttribute,
  OnAddInterfaceAttribute,
  OnAddTransportAttribute,
  OnRemoveInterfaceAttribute,
  OnRemoveTransportAttribute,
  OnAddTransportTerminalAttribute,
  OnAddInterfaceTerminalAttribute,
  OnRemoveInterfaceTerminalAttribute,
  OnRemoveTransportTerminalAttribute,
} from "../shared/components/parametersContent/handlers/OnChangeAttributeValue";
import { IsEdge, IsInterface, IsNode, IsTransport, IsTerminal } from "../../../../helpers/IsType";
import { OnLockParameter } from "../shared/components/parametersContent/handlers/OnLockParameter";

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
    if (IsNode(attributesElem)) OnChangeNodeAttributeValue(attributeId, attributesElem.id, property, value, dispatch);

    // Node terminal attributes
    if (IsTerminal(attributesElem) && IsNode(inspectorParentElem)) {
      OnChangeNodeTerminalAttributeValue(attributeId, inspectorParentElem.id, attributesElem.id, property, value, dispatch);
    }

    // Transport attributes
    if (IsTransport(attributesElem) && IsEdge(inspectorParentElem))
      OnChangeTransportAttributeValue(attributeId, inspectorParentElem.id, property, value, dispatch);

    // Interface attributes
    if (IsInterface(attributesElem) && IsEdge(inspectorParentElem))
      OnChangeInterfaceAttributeValue(attributeId, inspectorParentElem.id, property, value, dispatch);

    // Transport terminal - attributes
    if (IsTerminal(attributesElem) && IsEdge(inspectorParentElem) && inspectorParentElem.transport != null) {
      OnChangeTransportTerminalAttributeValue(attributeId, inspectorParentElem.id, attributesElem.id, property, value, dispatch);
    }

    // Interface terminal - attributes
    if (IsTerminal(attributesElem) && IsEdge(inspectorParentElem) && inspectorParentElem.interface != null) {
      OnChangeInterfaceTerminalAttributeValue(attributeId, inspectorParentElem.id, attributesElem.id, property, value, dispatch);
    }
  };

  // Remove attribute
  const onRemoveAttribute = (attributeId: string) => {
    // Remove Node attribute
    if (IsNode(attributesElem)) OnRemoveNodeAttribute(attributeId, attributesElem.id, attributes, dispatch);

    // Remove Node terminal attribute
    if (IsTerminal(attributesElem) && IsNode(inspectorParentElem)) {
      OnRemoveNodeTerminalAttribute(attributeId, inspectorParentElem.id, attributesElem.id, attributes, dispatch);
    }

    // Remove Transport attribute
    if (IsTransport(attributesElem) && IsEdge(inspectorParentElem)) {
      OnRemoveTransportAttribute(attributeId, inspectorParentElem.id, attributes, dispatch);
    }

    // Remove Interface attribute
    if (IsInterface(attributesElem) && IsEdge(inspectorParentElem)) {
      OnRemoveInterfaceAttribute(attributeId, inspectorParentElem.id, attributes, dispatch);
    }

    // Remove Transport terminal attribute
    if (IsTerminal(attributesElem) && IsEdge(inspectorParentElem) && inspectorParentElem.transport != null) {
      OnRemoveTransportTerminalAttribute(
        attributeId,
        inspectorParentElem.id,
        inspectorParentElem.transport?.inputTerminalId === attributesElem.id,
        attributes,
        dispatch
      );
    }

    // Remove Interface terminal attribute
    if (IsTerminal(attributesElem) && IsEdge(inspectorParentElem) && inspectorParentElem.interface != null) {
      OnRemoveInterfaceTerminalAttribute(
        attributeId,
        inspectorParentElem.id,
        inspectorParentElem.interface?.inputTerminalId === attributesElem.id,
        attributes,
        dispatch
      );
    }
  };

  // Add attribute
  const onAddAttribute = (attributeTypeId: string) => {
    // Add node attribute
    if (IsNode(attributesElem)) {
      OnAddNodeAttribute(attributeTypeId, attributesElem.id, attributeTypes, dispatch);
    }

    // Add Node terminal attribute
    if (IsTerminal(attributesElem) && IsNode(inspectorParentElem)) {
      OnAddNodeTerminalAttribute(attributeTypeId, inspectorParentElem.id, attributesElem.id, attributeTypes, dispatch);
    }

    // Add Transport attribute
    if (IsTransport(attributesElem) && IsEdge(inspectorParentElem)) {
      OnAddTransportAttribute(attributeTypeId, inspectorParentElem.id, attributesElem.id, attributeTypes, dispatch);
    }

    // Add Interface attribute
    if (IsInterface(attributesElem) && IsEdge(inspectorParentElem)) {
      OnAddInterfaceAttribute(attributeTypeId, inspectorParentElem.id, attributesElem.id, attributeTypes, dispatch);
    }

    // Add Transport terminal attribute
    if (IsTerminal(attributesElem) && IsEdge(inspectorParentElem) && inspectorParentElem.transport != null) {
      OnAddTransportTerminalAttribute(
        attributeTypeId,
        inspectorParentElem.id,
        inspectorParentElem.transport?.inputTerminalId === attributesElem.id,
        attributesElem.id,
        attributeTypes,
        dispatch
      );
    }

    // Add Interface terminal attribute
    if (IsTerminal(attributesElem) && IsEdge(inspectorParentElem) && inspectorParentElem.interface != null) {
      OnAddInterfaceTerminalAttribute(
        attributeTypeId,
        inspectorParentElem.id,
        inspectorParentElem.interface?.inputTerminalId === attributesElem.id,
        attributesElem.id,
        attributeTypes,
        dispatch
      );
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
