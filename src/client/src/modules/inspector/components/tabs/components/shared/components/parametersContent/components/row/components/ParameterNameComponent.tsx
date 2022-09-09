import { Attribute } from "@mimirorg/modelbuilder-types";
import { LinkIcon } from "../../../../../../../../../../../assets/icons/link";

interface Props {
  attribute: Attribute;
  hasTypeReference: boolean;
}

/**
 * Component to display a Parameter's name.
 * @param props
 * @returns the name of the Parameter, a clickable link is visisble if the Parameter has a TypeReference.
 */
export const ParameterNameComponent = ({ attribute, hasTypeReference }: Props) => {
  return hasTypeReference ? (
    <span>
      <a href={attribute.typeReferences[0].iri} target="_blank" rel="noopener noreferrer">
        {attribute.entity}
        <img src={LinkIcon} alt="link" className="linkIcon" />
      </a>
    </span>
  ) : (
    <span>{attribute.entity}</span>
  );
};
