import { ListHeader } from "../ListHeader";
import { TerminalsListBody } from "./TerminalsListBody";
import { ListWrapper } from "../../../../../componentLibrary";

import { TextResources } from "../../../../../assets/textResources";

interface Props {}

export const TerminalsList = ({}: Props) => {
  return (
    <ListWrapper width={400}>
      <ListHeader
        label={TextResources.TypeEditor_Properties_Terminals}
        chooseVisible={true}
      />
      <TerminalsListBody />
    </ListWrapper>
  );
};

export default TerminalsList;
