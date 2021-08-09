import { Connector, Interface } from "../../../models";
import { LibraryState } from "../../../redux/store/library/types";
import { CreateId } from "../helpers/common";

const ConvertToInterface = (
    sourceConn: Connector,
    library: LibraryState
) => {
    const currentInterface = library?.interfaceTypes.find(
        (x) => x.terminalTypeId === sourceConn.terminalTypeId
    );
    if (currentInterface) {

        return {
            id: CreateId(),
            name: currentInterface.name,
            semanticReference: currentInterface.semanticReference,
            terminalId: sourceConn.id,
            terminal: sourceConn
        } as Interface;
    }

    return null;
};

export default ConvertToInterface;