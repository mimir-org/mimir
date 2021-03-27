export const loadStateFromStorage = (module: string) => {
  try {
    const serializedState = localStorage.getItem(`show_${module}`);
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
    localStorage.setItem(`show_${module}`, serializedState);
  } catch {
    return undefined;
  }
};
