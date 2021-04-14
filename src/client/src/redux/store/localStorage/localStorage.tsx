export const loadStateFromStorage = (key: string) => {
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

export const saveStateToStorage = (state: boolean, key: string) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`show_${key}`, serializedState);
  } catch {
    return undefined;
  }
};

// export const saveStateToAllModules = (state: string) => {
//   try {
//     const serializedState = JSON.parse(state);
//     localStorage.setItem("show_library", serializedState);
//     localStorage.setItem("show_inspector", serializedState);
//     localStorage.setItem("show_explorer", serializedState);
//   } catch {
//     return undefined;
//   }
// };
