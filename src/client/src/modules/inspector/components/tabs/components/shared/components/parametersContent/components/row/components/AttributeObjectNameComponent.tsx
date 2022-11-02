import { Attribute } from "@mimirorg/modelbuilder-types";
import { LinkIcon } from "../../../../../../../../../../../assets/icons/link";

interface Props {
  attribute: Attribute;
  hasTypeReference: boolean;
}

/**
 * Component to display a AttributeObject's name.
 * @param props
 * @returns the name of the Attribute. A clickable link is visisble if the Attribute has a TypeReference.
 */
export const AttributeObjectNameComponent = ({ attribute, hasTypeReference }: Props) => {
  return hasTypeReference ? (
    <span>
      <a href={attribute.attributeTypeIri} target="_blank" rel="noopener noreferrer">
        {attribute.entity}
        <img src={LinkIcon} alt="link" className="linkIcon" />
      </a>
    </span>
  ) : (
    <span>{attribute.entity}</span>
  );
};
