import { VerticalScrollbar } from "../../../../../componentLibrary";
import { TerminalsListElement } from "./TerminalsListElement";
import { TerminalListContainer } from "../../styled";

interface Props {}

export const TerminalsListBody = ({}: Props) => {
  return (
    <VerticalScrollbar height={200}>
      <TerminalListContainer>
        <TerminalsListElement name="Terminal name" />
        <TerminalsListElement name="Terminal name" />
        <TerminalsListElement name="Terminal name" />
        <TerminalsListElement name="Terminal name" />
        <TerminalsListElement name="Terminal name" />
        <TerminalsListElement name="Terminal name" />
        <TerminalsListElement name="Terminal name" />
        <TerminalsListElement name="Terminal name" />
        <TerminalsListElement name="Terminal name" />
        <TerminalsListElement name="Terminal name" />
        <TerminalsListElement name="Terminal name" />
        <TerminalsListElement name="Terminal name" />
      </TerminalListContainer>
    </VerticalScrollbar>
  );
};

export default TerminalsListBody;
