import { Attribute } from "@mimirorg/modelbuilder-types";
import CreateId from "../../components/flow/helpers/CreateId";

export const createAttributeCopy = (attribute: Attribute, parentId: string): Attribute => {
  if (attribute == null) return null;

  const copy = { ...attribute };
  copy.id = CreateId();
  copy.iri = null;

  if (copy.transportId) {
    copy.transportId = parentId;
    copy.transportIri = null;
    copy.interfaceId = null;
    copy.interfaceIri = null;
    copy.nodeId = null;
    copy.nodeIri = null;
    copy.terminalId = null;
    copy.terminalIri = null;
  }

  if (copy.interfaceId) {
    copy.transportId = null;
    copy.transportIri = null;
    copy.interfaceId = parentId;
    copy.interfaceIri = null;
    copy.nodeId = null;
    copy.nodeIri = null;
    copy.terminalId = null;
    copy.terminalIri = null;
  }

  if (copy.nodeId) {
    copy.transportId = null;
    copy.transportIri = null;
    copy.interfaceId = null;
    copy.interfaceIri = null;
    copy.nodeId = parentId;
    copy.nodeIri = null;
    copy.terminalId = null;
    copy.terminalIri = null;
  }

  if (copy.terminalId) {
    copy.transportId = null;
    copy.transportIri = null;
    copy.interfaceId = null;
    copy.interfaceIri = null;
    copy.nodeId = null;
    copy.nodeIri = null;
    copy.terminalId = parentId;
    copy.terminalIri = null;
  }

  return copy;
};
