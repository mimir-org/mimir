import { InspectorElement, InspectorAttributesElement } from "../../../../types";
import { GetAttributes } from "../shared/components/parametersContent/helpers/GetAttributes";
import { useState } from "react";
import { GetParametersColor } from "../shared/components/parametersContent/helpers/GetParametersColor";
import { AttributesBox } from "./AttributesComponent.styled";
// import { isProjectStateGloballyLockingSelector, projectIdSelector } from "../../../../../../redux/store";
import { useAppSelector, useAppDispatch, commonStateSelector, libraryStateSelector, projectStateSelector } from "store";
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
import { Block, Attribute, ConnectorTerminal } from "lib";
import { CommonState } from "store/reducers/commonReducer";

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
  const commonState = useAppSelector<CommonState>(commonStateSelector);
  const isGlobalLocking = false; //useAppSelector(isProjectStateGloballyLockingSelector);
  const [lockingAttribute, setLockingAttribute] = useState(null);
  const projectState = useAppSelector(projectStateSelector);
  const libraryState = useAppSelector(libraryStateSelector);

  const handleAttributeChange = (attributeId: string, property: string, value: string) => {
    // Node attributes
    if (attributesElem instanceof Block)
      OnChangeNodeAttributeValue(attributeId, attributesElem.id, property, value, dispatch);

    // Node terminal attributes
    if (attributesElem instanceof ConnectorTerminal && inspectorParentElem instanceof Block) {
      OnChangeNodeTerminalAttributeValue(attributeId, inspectorParentElem.id, attributesElem.id, property, value, dispatch);
    }
  };

  // Remove attribute
  const onRemoveAttribute = (attributeId: string) => {
    // Remove Node attribute
    if (attributesElem instanceof Block) OnRemoveNodeAttribute(attributeId, attributesElem.id, attributes, dispatch);

    // Remove Node terminal attribute
    if (attributesElem instanceof ConnectorTerminal && inspectorParentElem instanceof Block) {
      OnRemoveNodeTerminalAttribute(attributeId, inspectorParentElem.id, attributesElem.id, attributes, dispatch);
    }
  };

  // Add attribute
  const onAddAttribute = (attributeTypeId: string) => {
    // Add node attribute
    if (attributesElem instanceof Block) {
      OnAddNodeAttribute(attributeTypeId, attributesElem.id, libraryState.attributeTypes, dispatch);
    }

    // Add Node terminal attribute
    if (attributesElem instanceof ConnectorTerminal && inspectorParentElem instanceof Block) {
      OnAddNodeTerminalAttribute(
        attributeTypeId,
        inspectorParentElem.id,
        attributesElem.id,
        libraryState.attributeTypes,
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
                quantityDatums={libraryState.quantityDatumTypes}
                onChange={(attributeId: string, property: string, value: string) =>
                  handleAttributeChange(attributeId, property, value)
                }
                onLock={(attr, isLocked) =>
                  OnLockParameter(
                    inspectorParentElem,
                    attr,
                    projectState.project?.id,
                    isLocked,
                    commonState?.user?.email ?? "",
                    setLockingAttribute,
                    dispatch
                  )
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
