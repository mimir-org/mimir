import { TerminalSearchBar } from "./TerminalSearchBar";
import { TerminalMediaTypeWrapper } from "../../../styled";

interface Props {
  terminals: any;
}

export const SearchTerminalMediaType = ({ terminals }: Props) => {
  return (
    <TerminalMediaTypeWrapper>
      <TerminalSearchBar terminals={terminals} />
    </TerminalMediaTypeWrapper>
  );
};

export default SearchTerminalMediaType;
