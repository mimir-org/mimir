import { GetHandleType } from "../../helpers/GetHandleType";
import { Handle } from "react-flow-renderer";
import { Connector } from "@mimirorg/modelbuilder-types";
import { GetHandleClassName } from "../../helpers/GetHandleClassName";
import { HandleNodeTerminalBox } from "./HandleNodeTerminal.styled";

interface Props {
  connector: Connector;
}

/**
 * Component for a TreeNode connector. React Flow's connector is a Handle Component.
 * On top of the Handle component a wrapper with Mimir design and logic is placed.
 * @param interface
 * @returns a JSX Element containing a Handle component from Flow.
 */
export const HandleNodeTerminal = ({ connector }: Props) => {
  const [type, pos] = GetHandleType(connector);
  const className = GetHandleClassName(connector);

  return (
    <HandleNodeTerminalBox>
      <Handle type={type} position={pos} id={connector.id} className={className} />
    </HandleNodeTerminalBox>
  );
};
