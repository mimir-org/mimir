import { Connector, Project } from "../../../models/project";

export const LoadState = (key: string) => {
  try {
    const serializedState = localStorage.getItem(`show_${key}`);

    if (!serializedState) {
      if (key === "VisualFilter") return JSON.parse("false");
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

export const GetView = () => {
  try {
    const serializedState = localStorage.getItem(`ViewType`);

    if (serializedState === null || serializedState === undefined) {
      return null;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const SetView = (view: string) => {
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

export const GetProjectId = (): string => {
  try {
    const project = localStorage.getItem(`ProjectId`);

    if (project === null || project === undefined) {
      return null;
    }

    return project;
  } catch (err) {
    return undefined;
  }
};

export const GetProject = (): Project => {
  try {
    const project = localStorage.getItem(`Project`);

    if (project === null || project === undefined) {
      return null;
    }

    const currentProject = JSON.parse(project) as Project;
    if (!currentProject.edges) currentProject.edges = [];
    if (!currentProject.nodes) currentProject.nodes = [];
    return currentProject;
  } catch (err) {
    return undefined;
  }
};

export const SetProjectId = (projectId: string): void => {
  try {
    localStorage.setItem(`ProjectId`, projectId);
  } catch {
    return undefined;
  }
};

export const SetProject = (project: Project): void => {
  try {
    localStorage.setItem(`Project`, JSON.stringify(project));
  } catch {
    return undefined;
  }
};

export const DeleteProject = (): void => {
  try {
    localStorage.removeItem("Project");
    localStorage.removeItem("ProjectId");
  } catch {
    return undefined;
  }
};

export const HasProject = (): boolean => {
  try {
    const project = localStorage.getItem(`ProjectId`);
    return project !== null;
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
