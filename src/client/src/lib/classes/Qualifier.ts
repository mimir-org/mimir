import { jsonMember, jsonObject } from "typedjson";

@jsonObject
export class Qualifier {
  @jsonMember(String)
  id = "";

  @jsonMember(String)
  name = "";

  @jsonMember(String)
  value = "";
}
