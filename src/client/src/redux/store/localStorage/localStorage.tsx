export const loadStateFromStorage = (module: string) => {
  try {
    const serializedState = localStorage.getItem(module);
    console.log(localStorage);

    if (serializedState === null) {
      return JSON.parse("true");
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveStateToStorage = (state: boolean, module: string) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(module, serializedState);
  } catch {
    return undefined;
  }
};
