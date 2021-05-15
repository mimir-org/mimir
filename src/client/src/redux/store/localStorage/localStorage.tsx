import { ViewType } from "../../../models/project";

export const LoadState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(`show_${key}`);

    if (serializedState === null || serializedState === undefined) {
      return JSON.parse("true");
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const SaveState = (state: boolean, key: string) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`show_${key}`, serializedState);
  } catch {
    return undefined;
  }
};

export const CheckView = (view: string) => {
  try {
    const serializedState = localStorage.getItem(`ViewType`);

    if (serializedState === null || serializedState === undefined) {
      return null;
    }
    return JSON.parse(serializedState) === view;
  } catch (err) {
    return undefined;
  }
};

export const SaveView = (view: ViewType) => {
  try {
    const serializedState = JSON.stringify(view);
    localStorage.setItem(`ViewType`, serializedState);
  } catch {
    return undefined;
  }
};

export const SaveAllModules = (state: boolean) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`show_Library`, serializedState);
    localStorage.setItem(`show_Explorer`, serializedState);
    localStorage.setItem(`show_Inspector`, serializedState);
  } catch {
    return undefined;
  }
};

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

export const GetProject = (): string => {
  try {
    const project = localStorage.getItem(`Project`);

    if (project === null || project === undefined) {
      return null;
    }

    return project;
  } catch (err) {
    return undefined;
  }
};

export const SetProject = (projectId: string): void => {
  try {
    localStorage.setItem(`Project`, projectId);
  } catch {
    return undefined;
  }
};

export const HasProject = (): boolean => {
  try {
    const project = localStorage.getItem(`Project`);
    return project !== null;
  } catch (err) {
    return undefined;
  }
};
