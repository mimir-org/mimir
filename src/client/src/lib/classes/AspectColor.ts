import { Aspect } from "lib";
import { jsonMember, jsonObject } from "typedjson";
import { Theme } from "@mimirorg/component-library";

@jsonObject()
export class AspectColor {
  @jsonMember(String)
  public mainColor: string;

  @jsonMember(String)
  public selectedColor: string;

  @jsonMember(String)
  public headerColor: string;

  @jsonMember(String)
  public tabColor: string;

  @jsonMember(Number)
  public fromColor: string;

  @jsonMember(String)
  public toColor: string;

  @jsonMember(String)
  public terminalColor: string;

  /**
   * Constructor.
   */
  public constructor() {
    this.mainColor = null;
    this.selectedColor = null;
    this.headerColor = null;
    this.tabColor = null;
    this.fromColor = null;
    this.toColor = null;
    this.terminalColor = null;
  }

  public resolveColors(theme: Theme, aspect: Aspect): void {
    if (theme == null) throw Error("Can't resolve object on a null reference theme");

    if (aspect === Aspect.Function) {
      this.mainColor = theme.color.reference.functionAspect[95];
      this.selectedColor = theme.color.reference.functionAspect[80];
      this.headerColor = theme.color.reference.functionAspect[99];
      this.tabColor = theme.color.reference.functionAspect[90];
    }

    if (aspect === Aspect.Product) {
      this.mainColor = theme.color.reference.productAspect[90];
      this.selectedColor = theme.color.reference.productAspect[60];
      this.headerColor = theme.color.reference.productAspect[95];
      this.tabColor = theme.color.reference.productAspect[80];
    }

    if (aspect === Aspect.Location) {
      this.mainColor = theme.color.reference.locationAspect[60];
      this.selectedColor = theme.color.reference.locationAspect[30];
      this.headerColor = theme.color.reference.locationAspect[90];
      this.tabColor = theme.color.reference.locationAspect[70];
    }
  }

  public resolveFromToColors(theme: Theme, fromAspect: Aspect, toAspect: Aspect): void {
    if (theme == null) throw Error("Can't resolve object on a null reference theme");

    if (fromAspect === Aspect.Function) this.fromColor = theme.color.reference.functionAspect[95];
    if (fromAspect === Aspect.Product) this.fromColor = theme.color.reference.productAspect[90];
    if (fromAspect === Aspect.Location) this.fromColor = theme.color.reference.locationAspect[60];

    if (toAspect === Aspect.Function) this.toColor = theme.color.reference.functionAspect[95];
    if (toAspect === Aspect.Product) this.toColor = theme.color.reference.productAspect[90];
    if (toAspect === Aspect.Location) this.toColor = theme.color.reference.locationAspect[60];
  }
}
