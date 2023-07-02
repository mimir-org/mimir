import { Attribute } from "lib";
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
  return attribute && hasTypeReference ? (
    <span>
      <a href={attribute.attributeType} target="_blank" rel="noopener noreferrer">
        {attribute.name}
        <img src={LinkIcon} alt="link" className="linkIcon" />
      </a>
    </span>
  ) : (
    <span>{attribute?.name}</span>
  );
};
