import { PropsWithChildren, ElementType, ImgHTMLAttributes, ReactElement, ReactNode, Dispatch, SetStateAction, InputHTMLAttributes, HTMLAttributes, Ref, TextareaHTMLAttributes, FormHTMLAttributes } from "react";
import * as Separator from "@radix-ui/react-separator";
import { GroupBase, Props as _Props5 } from "react-select";
import ReactSelectType from "react-select/base";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { CheckboxProps } from "@radix-ui/react-checkbox";
import { RadioGroupItemProps } from "@radix-ui/react-radio-group";
import { SwitchProps } from "@radix-ui/react-switch";
interface Accent {
    base: string;
    on: string;
    container?: Accent;
}
interface AnimationSystem {
    fade: Record<string, unknown>;
    scale: Record<string, unknown>;
    selectHover: Record<string, unknown>;
    buttonTap: Record<string, unknown>;
    checkboxTap: Record<string, unknown>;
    radioButtonTap: Record<string, unknown>;
    from: (direction: "top" | "right" | "bottom" | "left", distance?: number) => Record<string, unknown>;
}
interface BorderSystem {
    radius: {
        small: string;
        medium: string;
        large: string;
        round: string;
    };
}
interface _Palette1 {
    0: string;
    10: string;
    20: string;
    30: string;
    40: string;
    50: string;
    60: string;
    70: string;
    80: string;
    90: string;
    95: string;
    99: string;
    100: string;
}
interface ColorReference {
    primary: _Palette1;
    secondary: _Palette1;
    tertiary: _Palette1;
    success: _Palette1;
    error: _Palette1;
    warning: _Palette1;
    neutral: _Palette1;
    neutralVariant: _Palette1;
    functionAspect: _Palette1;
    productAspect: _Palette1;
    locationAspect: _Palette1;
}
interface ColorSystem {
    reference: ColorReference;
    text: Accent;
    primary: Accent;
    secondary: Accent;
    tertiary: Accent;
    success: Accent;
    error: Accent;
    warning: Accent;
    outline: Pick<Accent, "base">;
    background: Pick<Accent, "base" | "on"> & {
        inverse: Pick<Accent, "base" | "on">;
    };
    surface: Pick<Accent, "base" | "on"> & {
        variant: Pick<Accent, "base" | "on">;
        inverse: Pick<Accent, "base" | "on">;
    };
    shadow: Pick<Accent, "base">;
    pure: Accent;
    functionAspect: Accent;
    productAspect: Accent;
    locationAspect: Accent;
}
interface ScaleSpecification {
    font: string;
    size: string | number;
    weight: string | number;
    family: string;
    tracking: number;
    letterSpacing: string;
    lineHeight: string | number;
}
interface NominalScale {
    large: ScaleSpecification;
    medium: ScaleSpecification;
    small: ScaleSpecification;
}
interface QuerySystem {
    breakpoints: {
        phoneMax: number;
        tabletMax: number;
        laptopMax: number;
    };
    phoneAndBelow: () => string;
    tabletAndBelow: () => string;
    laptopAndBelow: () => string;
}
interface ShadowSystem {
    small: string;
    medium: string;
    large: string;
    xl: string;
}
interface SpacingSystem {
    unit: number;
    xs: string;
    s: string;
    base: string;
    l: string;
    xl: string;
    xxl: string;
    xxxl: string;
    multiple: (scalar: number) => string;
}
interface StateSystem {
    hover: number;
    focus: number;
    pressed: number;
    dragged: number;
    enabled: number;
    disabled: number;
}
interface TypefaceReference {
    brand: string;
    weights: {
        bold: number;
        medium: number;
        normal: number;
        light: number;
    };
}
interface TypeScaleDimension<T> {
    base: T;
    n3: T;
    n2: T;
    n1: T;
    p1: T;
    p2: T;
    p3: T;
    p4: T;
    p5: T;
    p6: T;
    p7: T;
}
interface TypeScaleSpecification<T> {
    size: TypeScaleDimension<T>;
    lineHeight: TypeScaleDimension<T>;
}
interface TypographyRoles {
    display: NominalScale;
    headline: NominalScale;
    title: NominalScale;
    body: NominalScale;
    label: NominalScale;
}
interface TypographySystem {
    typeface: TypefaceReference;
    typeScale: TypeScaleSpecification<number>;
    typeScaleSystem: TypeScaleSpecification<string>;
    roles: TypographyRoles;
}
interface Theme {
    border: BorderSystem;
    color: ColorSystem;
    typography: TypographySystem;
    shadow: ShadowSystem;
    spacing: SpacingSystem;
    state: StateSystem;
    animation: AnimationSystem;
    queries: QuerySystem;
}
type DisplayType = "display-large" | "display-medium" | "display-small";
type HeadlineType = "headline-large" | "headline-medium" | "headline-small";
type TitleType = "title-large" | "title-medium" | "title-small";
type BodyType = "body-large" | "body-medium" | "body-small";
type LabelType = "label-large" | "label-medium" | "label-small";
export type TextTypes = DisplayType | HeadlineType | TitleType | BodyType | LabelType;
export interface TextVariant {
    variant?: TextTypes;
}
interface Props {
    asChild?: boolean;
}
/**
 * A component for including data without displaying it.
 * A typical use case might be description text for icons that can only be read by screen readers.
 *
 * @param children Components or raw text that should remain hidden.
 * @param asChild Change the component to the HTML tag or custom component of the only child. This will merge the
 * original component props with the props of the supplied element/component and change the underlying DOM node.
 * @constructor
 */
export const VisuallyHidden: ({ children, asChild }: PropsWithChildren<Props>) => import("react/jsx-runtime").JSX.Element;
export interface Borders {
    border?: string | number;
    borderTop?: string | number;
    borderLeft?: string | number;
    borderRight?: string | number;
    borderBottom?: string | number;
    borderColor?: string;
    borderTopColor?: string;
    borderRightColor?: string;
    borderBottomColor?: string;
    borderLeftColor?: string;
    borderRadius?: string;
}
export interface Display {
    display?: string;
    overflow?: string;
    textOverflow?: string;
    visibility?: string;
    whiteSpace?: string;
}
export interface Ellipsis {
    useEllipsis?: boolean;
    ellipsisMaxLines?: number;
}
export interface Flex {
    flexDirection?: string;
    flexWrap?: string;
    justifyContent?: string;
    alignItems?: string;
    alignContent?: string;
    order?: string;
    flex?: string | number;
    flexGrow?: string;
    flexShrink?: string;
    flexFlow?: string;
    alignSelf?: string;
    gap?: string;
}
export interface Grid {
    gap?: string;
    columnGap?: string;
    rowGap?: string;
    gridColumn?: string;
    gridRow?: string;
    gridAutoFlow?: string;
    gridAutoColumns?: string;
    gridAutoRows?: string;
    gridTemplateColumns?: string;
    gridTemplateRows?: string;
    gridTemplateAreas?: string;
    gridArea?: string;
    justifyItems?: string;
    alignItems?: string;
    placeItems?: string;
    justifyContent?: string;
    alignContent?: string;
    placeContent?: string;
    justifySelf?: string;
    alignSelf?: string;
    placeSelf?: string;
}
export interface Palette {
    color?: string;
    bgColor?: string;
}
export interface Polymorphic<T extends ElementType> {
    as?: T;
}
export interface Positions {
    position?: string;
    zIndex?: string | number;
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
}
export interface Shadows {
    boxShadow?: string;
}
export interface Sizing {
    width?: string;
    maxWidth?: string;
    minWidth?: string;
    height?: string;
    maxHeight?: string;
    minHeight?: string;
    boxSizing?: string;
}
/**
 * m - margin
 * p - padding
 *
 * t - top
 * r - right
 * l - left
 * b - bottom
 *
 * x - left and right
 * y - top and bottom
 */
export interface Spacing {
    m?: string;
    mt?: string;
    mr?: string;
    mb?: string;
    ml?: string;
    mx?: string;
    my?: string;
    p?: string;
    pt?: string;
    pr?: string;
    pb?: string;
    pl?: string;
    px?: string;
    py?: string;
}
export interface Spacings {
    spacing?: Spacing;
}
export interface Typography {
    font?: string;
    fontFamily?: string;
    fontSize?: string;
    fontStyle?: string;
    fontWeight?: string | number;
    letterSpacing?: string;
    lineHeight?: string;
    textAlign?: string;
    textTransform?: string;
    wordBreak?: string;
}
/**
 * A simple wrapper over the img-tag
 * Has a default width and height of 1em
 * @param size sets height and width of icon
 */
export const Icon: import("styled-components").StyledComponent<"img", import("styled-components").DefaultTheme, ImgHTMLAttributes<HTMLImageElement> & Sizing & {
    size?: number | undefined;
}, never>;
/**
 * A polymorphic text component for non-heading text
 *
 * @param as element to display component as (defaults to <p>)
 * @param font overrides font of text element
 * @param fontSize overrides default size of the text element
 * @param fontWeight overrides default font-weight of the text element
 * @param color overrides default color of the text element
 * @constructor
 */
export const Text: import("styled-components").StyledComponent<"p", import("styled-components").DefaultTheme, Spacings & Sizing & Pick<Palette, "color" | "bgColor"> & Pick<Display, "display" | "whiteSpace" | "overflow" | "textOverflow" | "visibility"> & Pick<Typography, "font" | "fontSize" | "fontWeight" | "textAlign" | "textTransform" | "wordBreak" | "fontFamily" | "fontStyle" | "letterSpacing" | "lineHeight"> & Polymorphic<ElementType> & TextVariant & Ellipsis & {
    htmlFor?: string | undefined;
}, never>;
/**
 * A button with different variants.
 * A typical use case is in forms or navigation purposes.
 * original component props with the props of the supplied element/component and change the underlying DOM node.
 *
 * @param props Typical button properties as sizing, spacing, icons and variants.
 * @constructor
 */
export const Button: import("react").ForwardRefExoticComponent<import("index").Flex & import("index").Sizing & import("index").Spacings & import("index").Polymorphic<import("react").ElementType> & import("react").ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "text" | "filled" | "outlined" | "round" | undefined;
    iconPlacement?: "right" | "left" | undefined;
    iconOnly?: boolean | undefined;
    buttonColor?: import("components/atoms/buttons/Button.styled").ButtonColor | undefined;
} & {
    children: ReactNode;
    icon?: string | ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
    iconPlacement?: "right" | "left" | undefined;
    iconOnly?: boolean | undefined;
    textVariant?: TextTypes | undefined;
    buttonColor?: "primary" | "success" | "warning" | "error" | undefined;
} & import("react").RefAttributes<HTMLButtonElement>>;
interface ConditionalWrapperProps {
    condition?: boolean;
    wrapper: (children: ReactElement) => ReactElement;
    children: ReactElement;
}
/**
 * Component which facilities conditional wrapping of its children
 *
 * @example
 * // In this example if hideTitle is true <DialogTitle/> will be wrapped inside <VisuallyHidden/>
 * <ConditionalWrapper condition={hideTitle} wrapper={(c) => <VisuallyHidden asChild>{c}</VisuallyHidden>}>
 *  <DialogTitle>{title}</DialogTitle>
 * </ConditionalWrapper>
 *
 * @param condition that decides if children should be wrapped
 * @param wrapper the wrapping component
 * @param children component that will be wrapped if condition equals true
 * @constructor
 */
export const ConditionalWrapper: ({ condition, wrapper, children }: ConditionalWrapperProps) => ReactElement<any, string | import("react").JSXElementConstructor<any>>;
interface DividerProps {
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
    color?: string;
}
/**
 * A simple divider for creating a clear separation between content
 *
 * See documentation link below for details.
 * @see https://www.radix-ui.com/docs/primitives/components/separator
 */
export const Divider: import("styled-components").StyledComponent<import("react").ForwardRefExoticComponent<Separator.SeparatorProps & import("react").RefAttributes<HTMLDivElement>>, import("styled-components").DefaultTheme, DividerProps, never>;
/**
 * Function to ignore circular references
 */
export const ignoreCircularReferences: () => (key: string, value: object) => object | undefined;
/**
 * Create a unique GUID id
 */
export const createId: () => string;
/**
 * Create a unique GUID id
 * @param domain The domain included in id ex. example.com_xxxxx-xxxxx-xxxxx
 */
export const createDomainId: (domain: string) => string;
/**
 * Get domain from id
 * @param id The id formatted as example.com_xxxxx-xxxxx-xxxxx
 */
export const getDomainFromId: (id: string) => string;
/**
 *
 * @param value The value that should replace trailing slashes
 * @returns The replaced string without trailing slashes
 */
export const removeTrailingSlashes: (value: string) => string;
/**
 * Create a unique number id based on unique string
 * @param negative
 */
export const createNumberId: (negative?: boolean) => number;
/**
 * Calculate working days between two dates
 *
 * @param from The from date
 * @param to The to date
 * @returns Calculated number
 */
export const calculateDays: (from: Date | null, to: Date | null) => number;
/**
 * Force a date to correct type
 *
 * @param value The date like value to force
 */
export const forceDate: (value: Date | string | null | undefined) => Date | undefined;
/**
 * Check if date is between to dates
 * @param current The date to check for is between
 * @param from The from date to check for
 * @param to The to date to check for
 */
export const isdateBetween: (current: Date, from: Date | undefined, to: Date | undefined) => boolean;
type ResizablePanelContainerProps = Spacings & {
    maxTrigger?: boolean;
};
type ResizablePanelProps = ResizablePanelContainerProps & {
    children: ReactNode;
    duration: number;
    maxHeight?: number;
};
export const ResizablePanel: ({ children, duration, maxHeight }: ResizablePanelProps) => import("react/jsx-runtime").JSX.Element;
type MotionPanelProps = ResizablePanelProps & {
    header: ReactNode;
    open: boolean;
};
export const MotionPanel: {
    (props: MotionPanelProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
/**
 * Removes styles from react router links.
 * Useful when wrapping other elements with navigation semantics.
 */
export const PlainLink: import("styled-components").StyledComponent<import("react").ForwardRefExoticComponent<import("react-router-dom").LinkProps & import("react").RefAttributes<HTMLAnchorElement>>, import("styled-components").DefaultTheme, Sizing, never>;
interface SpinnerProps {
    variant?: "scale" | "circle";
    disabled: boolean;
}
/**
 * Component the draws a spinner on screen
 *
 * @param variant spinner variants
 * @param disabled
 * @constructor
 */
export const Spinner: {
    ({ variant, disabled }: SpinnerProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
    defaultValues: {
        variant: string;
        disabled: boolean;
    };
};
/**
 * A polymorphic component for heading elements
 *
 * @param as element to display component as (defaults to <h1>)
 * @param font overrides font of text element
 * @param fontSize overrides default size of the text element
 * @param fontWeight overrides default font-weight of the text element
 * @param color overrides default color of the text element
 * @param useEllipsis enable truncation of text
 * @param ellipsisMaxLines set how many lines to display before truncation
 * @constructor
 */
export const Heading: import("styled-components").StyledComponent<"h1", import("styled-components").DefaultTheme, Spacings & Sizing & Pick<Palette, "color"> & Pick<Display, "display" | "whiteSpace"> & Pick<Typography, "font" | "fontSize" | "fontWeight" | "textAlign" | "textTransform" | "wordBreak"> & Polymorphic<ElementType> & TextVariant & Ellipsis, never>;
/**
 * A generic tooltip for describing focusable elements.
 * Handles focus management, collision detection, a11y tags and more.
 *
 * See documentation link below for details.
 * @see https://www.radix-ui.com/docs/primitives/components/tooltip
 *
 * @param children element which receive focus to trigger tooltip
 * @param content of the tooltip itself
 * @param placement target placement of the tooltip
 * @param align target alignment of the tooltip
 * @param delay in ms before showing the tooltip
 * @param offset in px away from the element which triggers the tooltip
 * @param delegated receives sizing props for overriding default styles
 * @constructor
 */
export const Tooltip: import("react").ForwardRefExoticComponent<import("index").Sizing & {
    content: ReactNode;
    placement?: "top" | "right" | "bottom" | "left" | undefined;
    align?: "center" | "end" | "start" | undefined;
    delay?: number | undefined;
    offset?: number | undefined;
    asChild?: boolean | undefined;
} & {
    children?: ReactNode;
} & import("react").RefAttributes<HTMLDivElement>>;
interface ApplicationSetting {
    language: LanguageSetting;
}
interface Language {
    code: string;
    name: string;
}
interface LanguageSetting {
    current: string;
    languages: Language[];
}
interface IApplicationContext {
    setting: ApplicationSetting;
    setSetting: Dispatch<SetStateAction<ApplicationSetting>>;
}
interface SettingProviderProps {
    children?: ReactNode;
}
export const SettingProvider: ({ children }: SettingProviderProps) => import("react/jsx-runtime").JSX.Element;
export const useSetting: () => IApplicationContext;
/**
 * Local storage hook to read data from local storage and write data to local storage.
 * The data is stored in json format.
 * <p>
 * If error it returns the initial value and logs a warning to the console.
 *
 * @param key  the storage key
 * @param initialValue the initial value to be stored
 */
export function useLocalStorage<T>(key: string, initialValue: T): readonly [T, (value: T | ((val: T) => T)) => void];
export const useMimirorgTheme: () => Theme;
/**
 * Read data from file and create a base64 string
 *
 * @param file the file that should be converted
 */
export const toBase64: (file: File) => Promise<string | ArrayBuffer | null>;
/**
 * Read value from local storage
 * The data must be stored in json format.
 * If error it returns null and logs a warning to the console.
 *
 * @param key  the storage key
 */
export function lsReadValue<T>(key: string): T;
/**
 * Save value to local storage
 * The data will be stored in json format.
 * If error it returns null and logs a warning to the console.
 * If the value is null, the key will be removed from local storage
 *
 * @param key   the storage key
 * @param value the value that will be saved
 */
export function lsSaveValue<T>(key: string, value: T): void;
interface MimirorgThemeProviderProps {
    theme?: "light" | "dark";
}
/**
 * Custom theme provider which exposes a namespaced theme.
 * Also wraps its children with other global dependencies that the components are dependent upon.
 *
 * @param theme
 * @param children
 * @constructor
 */
export const MimirorgThemeProvider: ({ theme, children }: PropsWithChildren<MimirorgThemeProviderProps>) => import("react/jsx-runtime").JSX.Element;
export const FunctionIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const FunctionFilterIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const LocationIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const LocationFilterIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const ProductIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const ProductFilterIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const CheckmarkIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const CheckmarkCheckedIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const CheckmarkEmptyIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const DeleteIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const DeleteActiveIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const DeleteDisabledIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const AvatarBackgroundIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const BlockViewIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const BlockViewActiveIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const DarkModeIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const FilterIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const FilterActiveIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const FitViewIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const HorizontalIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const LightModeIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const LogoutIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const NotificationsIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const SettingsIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const TreeViewIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const TreeViewActiveIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const VerticalIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const LibraryIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const LockIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const LockClosedIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const LockOpenIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const LogoIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const ToogleDownIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const ToogleUpIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const ExpandedIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const ExpandedWhiteIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const CollapseIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const CollapseAccordionIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const CollapseAccordionNestedIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const CollapseWhiteIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const ExpandedAccordionIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
export const ExpandedAccordionNestedIcon: import("styled-components").StyledComponent<import("react").FunctionComponent<import("react").SVGProps<SVGSVGElement> & {
    title?: string | undefined;
}>, import("styled-components").DefaultTheme, import("react").SVGProps<SVGSVGElement> & import("index").Sizing & {
    size?: number | undefined;
}, never>;
/**
 * A polymorphic layout component for a box element.
 *
 * Since many components often need a generic box for layout purposes this component exposes flexbox and grid properties
 * in addition to properties related to display, positions, palette, sizing, spacing, borders, shadows etc.
 *
 * @param as polymorphic parameter for changing base element (defaults to <div>)
 * @param props can receive all the css properties related to the aforementioned interfaces: palette, sizing etc...
 * @constructor
 */
export const Box: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, Display & Positions & Flex & Grid & Palette & Sizing & Spacings & Borders & Shadows & Polymorphic<ElementType>, never>;
/**
 * An animation wrapper for the Box component
 *
 * @see https://github.com/framer/motion
 */
export const MotionBox: import("framer-motion").CustomDomComponent<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
} & {
    theme?: import("styled-components").DefaultTheme | undefined;
} & {
    as?: string | import("react").ComponentType<any> | undefined;
    forwardedAs?: string | import("react").ComponentType<any> | undefined;
}>;
/**
 * A polymorphic layout component for flexbox behaviour.
 *
 * @param as polymorphic parameter for changing base element (defaults to <div>)
 * @param props can receive all standard css flexbox properties
 * @constructor
 */
export const Flexbox: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, Flex & Polymorphic<ElementType>, never>;
/**
 * An animation wrapper for the Flexbox component
 *
 * @see https://github.com/framer/motion
 */
export const MotionFlexbox: import("framer-motion").CustomDomComponent<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
} & {
    theme?: import("styled-components").DefaultTheme | undefined;
} & {
    as?: string | import("react").ComponentType<any> | undefined;
    forwardedAs?: string | import("react").ComponentType<any> | undefined;
}>;
/**
 * A polymorphic layout component for grid behaviour.
 *
 * @param as polymorphic parameter for changing base element (defaults to <div>)
 * @param props can receive all standard css grid properties
 * @constructor
 */
export const Gridbox: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, Grid & Polymorphic<ElementType>, never>;
/**
 * An animation wrapper for the Grid component
 *
 * @see https://github.com/framer/motion
 */
export const MotionGridbox: import("framer-motion").CustomDomComponent<{
    [x: string]: any;
    [x: number]: any;
    [x: symbol]: any;
} & {
    theme?: import("styled-components").DefaultTheme | undefined;
} & {
    as?: string | import("react").ComponentType<any> | undefined;
    forwardedAs?: string | import("react").ComponentType<any> | undefined;
}>;
/**
 * A simple wrapper over the input-tag, with styling that follows library conventions.
 */
export const Input: import("react").ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & Omit<Sizing, "boxSizing"> & {
    icon?: string | ReactElement<any, string | import("react").JSXElementConstructor<any>> | undefined;
    iconPlacement?: "right" | "left" | undefined;
} & import("react").RefAttributes<HTMLInputElement>>;
export type CalendarVariant = "standard" | "compact";
type CalendarComponentContainerProps = Flex & Sizing & Spacings & Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
    variant?: CalendarVariant;
};
export type SelectVariant = "standard" | "compact";
interface SelectProps<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>> extends _Props5<Option, IsMulti, Group> {
    variant?: SelectVariant;
    selectRef?: Ref<ReactSelectType<Option, IsMulti, Group>>;
}
/**
 * Select component built on top of react-select. Offers a generic api to allow for using almost any data-structure as options.
 *
 * See documentation links below for details.
 * @see https://react-select.com
 * @see https://react-select.com/typescript#select-generics
 *
 * @constructor
 * @param props takes all react-select props in addition to variant (styling) and selectRef (reference by prop)
 */
export const Select: <Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: SelectProps<Option, IsMulti, Group>) => import("react/jsx-runtime").JSX.Element;
export interface FileInfo {
    id: number;
    fileName: string;
    fileSize: number;
    file: string | null;
    contentType: string;
    description: string;
}
interface DialogDescriptionProps {
    children: ReactNode;
    hide?: boolean;
}
export const DialogDescription: ({ children, hide }: DialogDescriptionProps) => import("react/jsx-runtime").JSX.Element;
export const DialogExit: ({ closeText }: {
    closeText?: string | undefined;
}) => import("react/jsx-runtime").JSX.Element;
interface DialogTitleProps {
    children: ReactNode;
    hide?: boolean;
}
export const DialogTitle: ({ children, hide }: DialogTitleProps) => import("react/jsx-runtime").JSX.Element;
type DialogContentProps = Sizing & Flex;
type DialogProps = Pick<DialogPrimitive.DialogProps, "open" | "onOpenChange"> & DialogContentProps & {
    children?: ReactNode;
    content: ReactNode;
    title: string;
    description?: string;
    hideTitle?: boolean;
    hideDescription?: boolean;
    closeText?: string;
};
/**
 * Component which is overlaid the primary window, rendering the content underneath inert.
 * Can operate in both a controlled and uncontrolled mode by utilizing open and onOpenChange properties.
 *
 * See documentation link below for details.
 * @see https://www.radix-ui.com/docs/primitives/components/dialog
 *
 * @param children component that triggers dialog visibility
 * @param content shown inside the dialog itself
 * @param open property for overriding the open state of the dialog
 * @param onOpenChange event handler called when the open state of the dialog changes
 * @param title required title of dialog (can be hidden visually with hideTitle prop)
 * @param description optional description of dialog
 * @param hideTitle hides the title from view while remaining readable by screen-readers
 * @param hideDescription hides the description from view while remaining readable by screen-readers
 * @param closeText property for overriding the default text for closing the dialog (screen-readers)
 * @param delegated receives sizing and flexbox props for overriding default styles
 * @constructor
 */
export const Dialog: import("react").ForwardRefExoticComponent<Pick<DialogPrimitive.DialogProps, "open" | "onOpenChange"> & import("index").Sizing & import("index").Flex & {
    children?: ReactNode;
    content: ReactNode;
    title: string;
    description?: string | undefined;
    hideTitle?: boolean | undefined;
    hideDescription?: boolean | undefined;
    closeText?: string | undefined;
} & import("react").RefAttributes<HTMLButtonElement>>;
export const Textarea: import("styled-components").StyledComponent<"textarea", import("styled-components").DefaultTheme, TextareaHTMLAttributes<HTMLTextAreaElement> & Sizing, never>;
interface _Props1 {
    value: FileInfo[];
    onChange?: (files: FileInfo[]) => void;
    placeholder?: string;
    tooltip?: string;
    buttonText?: string;
    disabled?: boolean;
}
export const FileComponent: import("react").ForwardRefExoticComponent<_Props1 & import("react").RefAttributes<HTMLDivElement>>;
/**
 * A simple wrapper around form to control general form layout
 */
export const Form: import("styled-components").StyledComponent<"form", import("styled-components").DefaultTheme, FormHTMLAttributes<HTMLFormElement> & Flex, never>;
interface FormErrorBannerProps {
    children?: ReactNode;
}
/**
 * Banner for displaying global error information in forms
 */
export const FormErrorBanner: ({ children }: FormErrorBannerProps) => import("react/jsx-runtime").JSX.Element;
interface FormFieldProps {
    label?: string;
    error?: {
        message?: string;
    };
    indent?: boolean;
}
/**
 * A component for wrapping form inputs with an error message and/or a label
 *
 * @param label describing the input
 * @param error message for the given input
 * @param indent if the label should be indented
 * @param children
 * @constructor
 */
export const FormField: ({ label, error, indent, children }: PropsWithChildren<FormFieldProps>) => import("react/jsx-runtime").JSX.Element;
/**
 * A simple wrapper around fieldset to control padding/margins/spacing around form inputs
 */
export const FormFieldset: import("styled-components").StyledComponent<"fieldset", import("styled-components").DefaultTheme, Flex, never>;
interface _Props2 {
    title?: string;
    subtitle?: string;
}
/**
 * A component for describing a given form
 * @param title
 * @param subTitle
 * @constructor
 */
export const FormHeader: ({ title, subtitle }: _Props2) => import("react/jsx-runtime").JSX.Element;
type FormLegendProps = {
    backgroundColor?: string;
    color?: string;
};
/**
 * A simple wrapper around legend
 */
export const FormLegend: import("styled-components").StyledComponent<"legend", import("styled-components").DefaultTheme, FormLegendProps, never>;
type PopoverContentProps = Sizing & Palette;
type _Props3 = PopoverContentProps & {
    content: ReactNode;
    onOpenChange?: () => void;
    placement?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    offset?: number;
};
/**
 * A generic popover for providing focusable elements with extra information.
 * Handles focus management, collision detection, a11y tags and more.
 *
 * See documentation link below for details.
 * @see https://www.radix-ui.com/docs/primitives/components/popover
 *
 * @param children element which receive focus to trigger popover
 * @param content of the popover itself
 * @param onOpenChange called when popover open state changes
 * @param placement target placement of the popover
 * @param align target alignment of the popover
 * @param offset in px away from the element which triggers the popover
 * @param delegated receives sizing props for overriding default styles
 * @constructor
 */
export const Popover: ({ children, content, onOpenChange, placement, align, offset, ...delegated }: PropsWithChildren<_Props3>) => import("react/jsx-runtime").JSX.Element;
interface CalendarComponentProps extends CalendarComponentContainerProps {
    icon?: ReactElement;
    onChange?: (item: Date | undefined) => void;
    value?: Date | string | null;
    placeholder?: string;
    disabled?: boolean;
    reset?: boolean;
    inputHidden?: boolean;
    iconSize?: number;
    buttonHeight?: string;
}
/**
 * Component that displays a calendar button, field and calendar popover.
 *
 * @see https://github.com/wojtekmaj/react-calendar#readme
 *
 * @param text label text
 * @param checked check status
 * @constructor
 */
export const CalendarComponent: import("react").ForwardRefExoticComponent<CalendarComponentProps & import("react").RefAttributes<HTMLInputElement>>;
/**
 * A simple checkbox wrapper, with styling that follows library conventions.
 *
 * @see https://www.radix-ui.com/docs/primitives/components/checkbox
 *
 * @constructor
 */
export const Checkbox: import("react").ForwardRefExoticComponent<CheckboxProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface OptionItem {
    label: string;
    value: string;
    checked: boolean;
}
type RadioGroupProps = RadioGroupItemProps & {
    options?: OptionItem[];
    direction?: "row" | "column";
    onRadioChange?: (item: OptionItem) => void;
};
/**
 * A simple Radio button wrapper, with styling that follows library conventions.
 *
 * @see https://www.radix-ui.com/docs/primitives/components/radio-group
 *
 * @constructor
 */
export const RadioButton: {
    ({ options, direction, onRadioChange, ...rest }: RadioGroupProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
    defaultProps: {
        options: OptionItem[];
        direction: string;
    };
};
/**
 * A simple wrapper over the input-tag, with styling that follows library conventions.
 */
export const RichTextarea: import("react").ForwardRefExoticComponent<Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
    value: string;
    width?: string | undefined;
    height?: string | undefined;
    placeholder?: string | undefined;
    onChange?: ((value: string) => void) | undefined;
} & import("react").RefAttributes<HTMLDivElement>>;
type SwitchComponentProps = Spacings & SwitchProps & {
    text?: string;
    onSwitchChange?: (status: boolean) => void;
};
/**
 * Component that displays a switch with label.
 *
 * @see https://www.radix-ui.com/docs/primitives/components/switch
 *
 * @param text label text
 * @param checked check status
 * @constructor
 */
export const SwitchComponent: {
    (props: SwitchComponentProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
    defaultProps: {
        text: string;
        checked: boolean;
    };
};
interface UserInput {
    id: string;
    value: string;
}
export const UserAutoComplete: import("react").ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & Omit<Sizing, "boxSizing"> & {
    users: UserInput[];
    value?: string | undefined;
    onItemChange?: ((id: string) => void) | undefined;
} & import("react").RefAttributes<HTMLInputElement>>;
/**
 * Call it to create a toast from anywhere, even outside React.
 * Make sure to wrap the application with the component library's theme provider first.
 *
 * @example
 * import { toast } from "...";
 *
 * export const MyComponent () => {
 *   const onClick = toast("You clicked the button");
 *
 *   return <button onClick={() => onClick()}>Action</button>;
 * };
 *
 * @see https://react-hot-toast.com/docs/toast
 */
export const toast: {
    (message: import("react-hot-toast").Renderable | import("react-hot-toast").ValueFunction<import("react-hot-toast").Renderable, import("react-hot-toast").Toast>, opts?: Partial<Pick<import("react-hot-toast").Toast, "style" | "className" | "id" | "icon" | "duration" | "position" | "ariaProps" | "iconTheme">> | undefined): string;
    error: (message: import("react-hot-toast").Renderable | import("react-hot-toast").ValueFunction<import("react-hot-toast").Renderable, import("react-hot-toast").Toast>, options?: Partial<Pick<import("react-hot-toast").Toast, "style" | "className" | "id" | "icon" | "duration" | "position" | "ariaProps" | "iconTheme">> | undefined) => string;
    success: (message: import("react-hot-toast").Renderable | import("react-hot-toast").ValueFunction<import("react-hot-toast").Renderable, import("react-hot-toast").Toast>, options?: Partial<Pick<import("react-hot-toast").Toast, "style" | "className" | "id" | "icon" | "duration" | "position" | "ariaProps" | "iconTheme">> | undefined) => string;
    loading: (message: import("react-hot-toast").Renderable | import("react-hot-toast").ValueFunction<import("react-hot-toast").Renderable, import("react-hot-toast").Toast>, options?: Partial<Pick<import("react-hot-toast").Toast, "style" | "className" | "id" | "icon" | "duration" | "position" | "ariaProps" | "iconTheme">> | undefined) => string;
    custom: (message: import("react-hot-toast").Renderable | import("react-hot-toast").ValueFunction<import("react-hot-toast").Renderable, import("react-hot-toast").Toast>, options?: Partial<Pick<import("react-hot-toast").Toast, "style" | "className" | "id" | "icon" | "duration" | "position" | "ariaProps" | "iconTheme">> | undefined) => string;
    dismiss(toastId?: string | undefined): void;
    remove(toastId?: string | undefined): void;
    promise<T>(promise: Promise<T>, msgs: {
        loading: import("react-hot-toast").Renderable;
        success: import("react-hot-toast").ValueOrFunction<import("react-hot-toast").Renderable, T>;
        error: import("react-hot-toast").ValueOrFunction<import("react-hot-toast").Renderable, any>;
    }, opts?: import("react-hot-toast").DefaultToastOptions | undefined): Promise<T>;
};
interface NotFoundProps {
    title: string;
    subtitle: string;
    status: string;
    linkText: string;
    linkPath: string;
}
/**
 * Simple error message component offering navigation via link/button
 *
 * @param title
 * @param subtitle
 * @param status
 * @param linkText
 * @param linkPath
 * @constructor
 */
export const ErrorMessage: ({ title, subtitle, status, linkText, linkPath }: NotFoundProps) => import("react/jsx-runtime").JSX.Element;
type InspectorHeaderProps = {
    bgColor?: string;
};
type _Props4 = Spacings & InspectorHeaderProps & {
    duration: number;
    children: ReactNode;
    isOpen: boolean;
    isLocked: boolean;
    onLock?: () => void;
    onDelete?: () => void;
    onTabChange?: (value: "admin" | "attribute" | "terminal" | "relation") => void;
    icon?: string;
    name?: string;
    tabColor?: string;
    selectedTab?: "admin" | "attribute" | "terminal" | "relation";
};
/**
 * Simple error message component offering navigation via link/button
 *
 * @param title
 * @param subtitle
 * @param status
 * @param linkText
 * @param linkPath
 * @constructor
 */
export const InspectorPanel: {
    (props: _Props4): import("react/jsx-runtime").JSX.Element;
    defaultProps: {
        duration: number;
        isOpen: boolean;
        isLocked: boolean;
    };
};

//# sourceMappingURL=types.d.ts.map
