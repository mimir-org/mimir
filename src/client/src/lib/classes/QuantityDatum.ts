export interface GroupedOption {
  readonly label: string;
  readonly options: QuantityOption[];
  value?: string;
  isSelected?: boolean;
  category?: "provenance" | "range" | "regularity" | "scope";
}

export interface QuantityOption {
  readonly value: string;
  readonly label: string;
  isDisabled: boolean;
  isSelected?: boolean;
}

export interface CategoryOption extends QuantityOption {
  readonly category: "provenance" | "range" | "regularity" | "scope";
}

export class QuantityDatum {
  categories: CategoryOption[] = [
    { label: "Provenance", value: "provenance", isDisabled: false, isSelected: false, category: "provenance" },
    { label: "Range", value: "range", isDisabled: false, isSelected: false, category: "range" },
    { label: "Regularity", value: "regularity", isDisabled: false, isSelected: false, category: "regularity" },
    { label: "Scope", value: "scope", isDisabled: false, isSelected: false, category: "scope" },
  ];

  provenanceQualifier: QuantityOption[] = [
    { label: "Calculated", value: "calculated", isDisabled: false },
    { label: "Measured", value: "measured", isDisabled: false },
    { label: "Specified", value: "specified", isDisabled: false },
  ];

  rangeQualifier: QuantityOption[] = [
    { label: "Average", value: "average", isDisabled: false },
    { label: "Maximum", value: "maximum", isDisabled: false },
    { label: "Minimum", value: "minimum", isDisabled: false },
    { label: "Nominal", value: "nominal", isDisabled: false },
    { label: "Normal", value: "normal", isDisabled: false },
  ];

  regularityQualifier: QuantityOption[] = [
    { label: "Absolute", value: "absolute", isDisabled: false },
    { label: "Continuous", value: "continuous", isDisabled: false },
  ];

  scopeQualifier: QuantityOption[] = [
    { label: "Design", value: "design", isDisabled: false },
    { label: "Operating", value: "operating", isDisabled: false },
  ];

  public toJSONValueLabel() {
    return {
      categories: this.categories,
      provenance: this.provenanceQualifier,
      range: this.rangeQualifier,
      regularity: this.regularityQualifier,
      scope: this.scopeQualifier,
    };
  }

  public getCategoryOptions(): GroupedOption[] {
    const options = this.toJSONValueLabel();
    return options.categories.map((category) => {
      return {
        label: category.label,
        options: options[category.value],
        isSelected: false,
        category: category.value as "provenance" | "range" | "regularity" | "scope",
      };
    });
  }
}
