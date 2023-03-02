import { Connector, ConnectorVisibility } from "@mimirorg/modelbuilder-types";
import { ConnectorDirection } from "@mimirorg/typelibrary-types";

export interface ConnectionCm {
  id: string;
  fromConnector: string;
  toConnector: string;
  mainProject: string;
  project: string;
}
class Connection implements ConnectionCm {
  fromConnector: string;
  id: string;
  mainProject: string;
  project: string;
  toConnector: string;
}
