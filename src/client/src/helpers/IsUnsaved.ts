/**
 * Determine whether element has been saved to server. Elements not persisted to server will not have domain part of Id.
 * Domain will be split by underscore character.
 */
export const IsUnsaved = <T extends HasId>(element: T) => element?.id?.split("_").length !== 2;

interface HasId {
  id: string;
}
