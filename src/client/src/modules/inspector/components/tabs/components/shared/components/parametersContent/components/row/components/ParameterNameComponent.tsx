import { Attribute } from "@mimirorg/modelbuilder-types";
import { LinkIcon } from "../../../../../../../../../../../assets/icons/link";

interface Props {
  attribute: Attribute;
  hasTypeReference: boolean;
}

/**
 * Component to display a Parameter's name.
 * @param props
 * @returns the name of the Parameter, if the Paramater has a TypeReference a clickable link is visisble.
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
