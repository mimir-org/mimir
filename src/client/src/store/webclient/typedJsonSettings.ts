import { ITypedJSONSettings, TypedJSON } from "typedjson";
import { ProjectSearchResult } from "lib";

export const typedJsonSetting = (): ITypedJSONSettings => {
  return {
    typeResolver: (sourceObject, knownTypes) => {
      if (sourceObject.$type) {
        const type = sourceObject.$type.split(",");
        const typeParts = type[0].split(".");
        const className = typeParts[typeParts.length - 1];
        let trimmed = className.trimEnd();
        const lastChars = trimmed.slice(-2);
        if (lastChars === "Cm") {
          trimmed = trimmed.slice(0, -2);
        }
        return knownTypes.get(trimmed);
      }
    },
  };
};
