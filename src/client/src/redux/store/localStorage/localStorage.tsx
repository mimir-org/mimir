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
