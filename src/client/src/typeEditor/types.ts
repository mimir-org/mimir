import { Aspect, CreateLibraryType, ObjectType, TerminalTypeItem } from "../models";

export type AspectKey = keyof typeof Aspect;
export type ObjectTypeKey = keyof typeof ObjectType;
export type TerminalCategoryChangeKey = "add" | "remove" | "update" | "removeAll" | "terminalTypeId";
export type OnPropertyChangeFunction = <K extends keyof CreateLibraryType>(key: K, value: CreateLibraryType[K]) => void;
export type OnTerminalCategoryChangeFunction = <K extends TerminalCategoryChangeKey>(key: K, value: TerminalTypeItem) => void;
