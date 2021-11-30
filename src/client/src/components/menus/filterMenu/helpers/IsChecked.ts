import { Edge } from "../../../../models";
import { IsLocationTerminal, IsPartOf, IsProductTerminal, IsTransport } from "../../../flow/helpers";

export const AllRelationsChecked = (edges: Edge[]) => {
  return !edges.some((x) => x.isHidden && (IsLocationTerminal(x.fromConnector) || IsProductTerminal(x.fromConnector)));
};

export const AllPartOfChecked = (edges: Edge[]) => {
  return !edges.some((x) => x.isHidden && IsPartOf(x.fromConnector));
};

export const AllTransportsChecked = (edges: Edge[]) => {
  return !edges.some((x) => x.isHidden && IsTransport(x.fromConnector));
};

export const IsFluidChecked = (edges: Edge[], fluidId: string) => {
  const FLUID_TERMINAL_CATEGORY_ID = "7AF97A80D52C7CE139AE278A712C6A37"; // TODO: Remove

  return !edges.some(
    (x) =>
      x.isHidden &&
      x.fromConnector.terminalCategoryId === FLUID_TERMINAL_CATEGORY_ID &&
      x.fromConnector.terminalTypeId === fluidId &&
      IsTransport(x.fromConnector)
  );
};

export const AllFluidsChecked = (edges: Edge[]) => {
  const FLUID_TERMINAL_CATEGORY_ID = "7AF97A80D52C7CE139AE278A712C6A37"; // TODO: Remove

  return !edges.some(
    (x) => x.isHidden && x.fromConnector.terminalCategoryId === FLUID_TERMINAL_CATEGORY_ID && IsTransport(x.fromConnector)
  );
};
