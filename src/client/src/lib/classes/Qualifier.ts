import { jsonMember, jsonObject } from "typedjson";
import CreateId from "../CreateId";

@jsonObject
export class Qualifier {
  @jsonMember(String)
  id = "";

  @jsonMember(String)
  name = "";

  @jsonMember(String)
  value = "";

  constructor(name: string, value: string) {
    this.id = CreateId();
    this.name = name;
    this.value = value;
  }
}
