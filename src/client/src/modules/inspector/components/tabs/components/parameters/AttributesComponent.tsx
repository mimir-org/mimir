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
} from "../../../../../../redux/store";
import { AttributeObject } from "../shared/components/parametersContent/components/row/components/AttributeObject";
import {
  OnChangeInterfaceAttributeValue,
  OnChangeInterfaceTerminalAttributeValue,
  OnChangeNodeAttributeValue,
  OnChangeNodeTerminalAttributeValue,
  OnChangeTransportAttributeValue,
  OnChangeTransportTerminalAttributeValue,
} from "../shared/components/parametersContent/handlers/OnChangeAttributeValue";
import { IsConnector, IsEdge, IsInterface, IsNode, IsTransport } from "../../../../helpers/IsType";
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
  const dispatch = useAppDispatch();
  const attributes = attributeItems ?? GetAttributes(attributesElem);
  const username = useAppSelector(usernameSelector);
  const isGlobalLocking = useAppSelector(isProjectStateGloballyLockingSelector);
  const [lockingAttribute, setLockingAttribute] = useState(null);
  const quantityDatums = useAppSelector(qunatityDatumSelector);
  const projectId = useAppSelector(projectIdSelector);

  const handleAttributeChange = (attributeId: string, property: string, value: string) => {
    // Node attributes
    if (IsNode(attributesElem)) OnChangeNodeAttributeValue(attributeId, attributesElem.id, property, value, dispatch);

    // Node terminal attributes
    if (IsConnector(attributesElem) && IsNode(inspectorParentElem)) {
      OnChangeNodeTerminalAttributeValue(attributeId, inspectorParentElem.id, attributesElem.id, property, value, dispatch);
    }

    // Transport attributes
    if (IsTransport(attributesElem) && IsEdge(inspectorParentElem))
      OnChangeTransportAttributeValue(attributeId, inspectorParentElem.id, property, value, dispatch);

    // Interface attributes
    if (IsInterface(attributesElem) && IsEdge(inspectorParentElem))
      OnChangeInterfaceAttributeValue(attributeId, inspectorParentElem.id, property, value, dispatch);

    // Transport terminal - attributes
    if (IsConnector(attributesElem) && IsEdge(inspectorParentElem) && inspectorParentElem.transport != null) {
      OnChangeTransportTerminalAttributeValue(attributeId, inspectorParentElem.id, attributesElem.id, property, value, dispatch);
    }

    // Interface terminal - attributes
    if (IsConnector(attributesElem) && IsEdge(inspectorParentElem) && inspectorParentElem.interface != null) {
      OnChangeInterfaceTerminalAttributeValue(attributeId, inspectorParentElem.id, attributesElem.id, property, value, dispatch);
    }
  };

  return (
    <>
      {attributesElem && (
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
              />
            );
          })}
        </AttributesBox>
      )}
    </>
  );
};
