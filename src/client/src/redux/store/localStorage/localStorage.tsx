import { Connector } from "../../../models/project";

export const SaveEventData = (state: object, key: string) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`mb_event_${key}`, serializedState);
  } catch {
    return undefined;
  }
};

export const LoadEventData = (key: string): object => {
  try {
    const serializedState = localStorage.getItem(`mb_event_${key}`);

    if (serializedState === null || serializedState === undefined) {
      return JSON.parse("true");
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const SetConnectors = (connectors: Connector[]): void => {
  try {
    localStorage.setItem(`Connectors`, JSON.stringify(connectors));
  } catch {
    return undefined;
  }
};

export const GetConnectors = (): Connector[] => {
  try {
    const connectors = localStorage.getItem(`Connectors`);
    if (!connectors) return [];
    return JSON.parse(connectors);
  } catch {
    return undefined;
  }
};
