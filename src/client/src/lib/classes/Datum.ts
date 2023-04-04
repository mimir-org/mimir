import { jsonMember, jsonObject } from "typedjson";

@jsonObject
export class Datum {
  @jsonMember(String)
  public id: string;

  @jsonMember(String)
  public name: string;

  @jsonMember(String)
  public value: string;
}
