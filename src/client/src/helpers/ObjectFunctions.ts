export function nameof<T>(key: keyof T, _instance?: T): keyof T {
  return key;
}
