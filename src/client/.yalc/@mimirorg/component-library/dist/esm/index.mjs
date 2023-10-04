import { jsxs as $26Zo0$jsxs, jsx as $26Zo0$jsx, Fragment as $26Zo0$Fragment } from "react/jsx-runtime";
import {
  forwardRef as $26Zo0$forwardRef,
  isValidElement as $26Zo0$isValidElement,
  useState as $26Zo0$useState,
  useEffect as $26Zo0$useEffect,
  useMemo as $26Zo0$useMemo,
  createContext as $26Zo0$createContext,
  useContext as $26Zo0$useContext,
  useRef as $26Zo0$useRef,
} from "react";
import $26Zo0$styledcomponents, {
  useTheme as $26Zo0$useTheme,
  css as $26Zo0$css,
  ThemeProvider as $26Zo0$ThemeProvider,
  createGlobalStyle as $26Zo0$createGlobalStyle,
} from "styled-components";
import { Root as $26Zo0$Root } from "@radix-ui/react-visually-hidden";
import {
  math as $26Zo0$math,
  transparentize as $26Zo0$transparentize,
  lighten as $26Zo0$lighten,
  meetsContrastGuidelines as $26Zo0$meetsContrastGuidelines,
} from "polished";
import {
  motion as $26Zo0$motion,
  MotionConfig as $26Zo0$MotionConfig,
  AnimatePresence as $26Zo0$AnimatePresence,
} from "framer-motion";
import { Root as $26Zo0$Root1 } from "@radix-ui/react-separator";
import { Handle as $26Zo0$Handle } from "react-flow-renderer";
import $26Zo0$reactusemeasure from "react-use-measure";
import { Link as $26Zo0$Link } from "react-router-dom";
import { CircleLoader as $26Zo0$CircleLoader, ScaleLoader as $26Zo0$ScaleLoader } from "react-spinners";
import {
  Root as $26Zo0$Root2,
  Trigger as $26Zo0$Trigger,
  Portal as $26Zo0$Portal,
  Content as $26Zo0$Content,
  TooltipProvider as $26Zo0$TooltipProvider,
} from "@radix-ui/react-tooltip";
import { decode as $26Zo0$decode } from "base-64";
import "@fontsource/nunito-sans/300.css";
import "@fontsource/nunito-sans/400.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/nunito-sans/700.css";
import { Toaster as $26Zo0$Toaster, ToastBar as $26Zo0$ToastBar, toast as $26Zo0$toast } from "react-hot-toast";
import {
  CheckCircle as $26Zo0$CheckCircle,
  XCircle as $26Zo0$XCircle,
  ExclamationCircle as $26Zo0$ExclamationCircle,
} from "@styled-icons/heroicons-outline";
import {
  Root as $26Zo0$Root3,
  Trigger as $26Zo0$Trigger1,
  Portal as $26Zo0$Portal1,
  Overlay as $26Zo0$Overlay,
  Content as $26Zo0$Content1,
  Description as $26Zo0$Description,
  Close as $26Zo0$Close,
  Title as $26Zo0$Title,
} from "@radix-ui/react-dialog";
import { Close as $26Zo0$Close1 } from "@styled-icons/material";
import {
  Attachment as $26Zo0$Attachment,
  Description as $26Zo0$Description1,
  Clear as $26Zo0$Clear,
  Delete as $26Zo0$Delete,
  CalendarMonth as $26Zo0$CalendarMonth,
} from "@styled-icons/material-outlined";
import {
  Root as $26Zo0$Root4,
  Trigger as $26Zo0$Trigger2,
  Portal as $26Zo0$Portal2,
  Content as $26Zo0$Content2,
} from "@radix-ui/react-popover";
import { Calendar as $26Zo0$Calendar } from "react-calendar";
import { Root as $26Zo0$Root5, Indicator as $26Zo0$Indicator } from "@radix-ui/react-checkbox";
import { CheckBoxOutlineBlank as $26Zo0$CheckBoxOutlineBlank, CheckBox as $26Zo0$CheckBox } from "@styled-icons/material-rounded";
import { Root as $26Zo0$Root6, Item as $26Zo0$Item, Indicator as $26Zo0$Indicator1 } from "@radix-ui/react-radio-group";
import "quill/dist/quill.snow.css";
import { useQuill as $26Zo0$useQuill } from "react-quilljs";
import $26Zo0$reactselect from "react-select";
import { Root as $26Zo0$Root7, Thumb as $26Zo0$Thumb } from "@radix-ui/react-switch";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, { get: v, set: s, enumerable: true, configurable: true });
}
/// <reference types="./theme" />
/// <reference types="./global" />
var $def8772fc0858c89$exports = {};

$parcel$export($def8772fc0858c89$exports, "Button", () => $696f693fac81a609$export$353f5b6fc5456de1);
$parcel$export($def8772fc0858c89$exports, "ConditionalWrapper", () => $ab754ee3829129c7$export$39aecc95f0365819);
$parcel$export($def8772fc0858c89$exports, "Divider", () => $0d6276d0028f6bba$export$2e0a83ec2e27ecbb);
$parcel$export($def8772fc0858c89$exports, "FlowConnectorComponent", () => $143b5d0d90345639$export$179bb831147717ca);
$parcel$export($def8772fc0858c89$exports, "VisuallyHidden", () => $066b48d8e5b33e52$export$439d29a4e110a164);
$parcel$export($def8772fc0858c89$exports, "Icon", () => $54dcd6617557221f$export$f04a61298a47a40f);
$parcel$export($def8772fc0858c89$exports, "Symbol", () => $a0616ba83d24d848$export$3e25e887b7a5b37b);
$parcel$export($def8772fc0858c89$exports, "LogoBox", () => $d2e4eb53d530e7c5$export$4a2034c9f860b7cd);
$parcel$export($def8772fc0858c89$exports, "SymbolBox", () => $d2e4eb53d530e7c5$export$236d96ef38f832f6);
$parcel$export($def8772fc0858c89$exports, "MotionPanel", () => $131d9058faf478d3$export$b252e133e2c7204f);
$parcel$export($def8772fc0858c89$exports, "ResizablePanel", () => $692dde140a8b09f1$export$2fb164ca5cfe7082);
$parcel$export($def8772fc0858c89$exports, "PlainLink", () => $0a4fb0807d734a92$export$14892c202f726f14);
$parcel$export($def8772fc0858c89$exports, "Spinner", () => $8a61fa0583e81acb$export$7f7cbe89f1eacd2);
$parcel$export($def8772fc0858c89$exports, "Heading", () => $21894e23ce5bb51f$export$a8a3e93435678ff9);
$parcel$export($def8772fc0858c89$exports, "Text", () => $de0207036bb3fe06$export$5f1af8db9871e1d6);
$parcel$export($def8772fc0858c89$exports, "Tooltip", () => $6e97fa5953c89edb$export$28c660c63b792dea);

const $066b48d8e5b33e52$export$439d29a4e110a164 = ({ children: children, asChild: asChild }) => {
  return /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$Root, {
    asChild: asChild,
    children: children,
  });
};

const $0288e2eadd55a419$export$d3b29362ee011466 = (0, $26Zo0$css)`
  border: ${(props) => props.border};
  border-top: ${(props) => props.borderTop};
  border-left: ${(props) => props.borderLeft};
  border-right: ${(props) => props.borderRight};
  border-bottom: ${(props) => props.borderBottom};
  border-color: ${(props) => props.borderColor};
  border-top-color: ${(props) => props.borderTopColor};
  border-right-color: ${(props) => props.borderRightColor};
  border-bottom-color: ${(props) => props.borderBottomColor};
  border-left-color: ${(props) => props.borderLeftColor};
  border-radius: ${(props) => props.borderRadius};
`;

const $dbede0d07a4a8764$export$f8eec27d1ad18090 = (0, $26Zo0$css)`
  display: ${(props) => props.display};
  overflow: ${(props) => props.overflow};
  text-overflow: ${(props) => props.textOverflow};
  visibility: ${(props) => props.visibility};
  white-space: ${(props) => props.whiteSpace};
`;

const $67c30f5a5f973bd7$export$66376f8025bd3245 = (0, $26Zo0$css)`
  ${({ useEllipsis: useEllipsis, ellipsisMaxLines: ellipsisMaxLines }) => {
    if (!useEllipsis) return "";
    if (ellipsisMaxLines === 1)
      return (0, $26Zo0$css)`
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      `;
    if (ellipsisMaxLines && ellipsisMaxLines > 1)
      return (0, $26Zo0$css)`
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${ellipsisMaxLines};
        overflow: hidden;
      `;
  }}
`;

const $cc3087a9fdba245d$export$4f72868321d0b640 = (0, $26Zo0$css)`
  flex: ${(props) => props.flex};
  flex-grow: ${(props) => props.flexGrow};
  flex-wrap: ${(props) => props.flexWrap};
  flex-shrink: ${(props) => props.flexShrink};
  flex-direction: ${(props) => props.flexDirection};
  flex-flow: ${(props) => props.flexFlow};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  align-content: ${(props) => props.alignContent};
  align-self: ${(props) => props.alignSelf};
  order: ${(props) => props.order};
  gap: ${(props) => props.gap};
`;

const $a5ec92789176ef4c$export$166ec73ef8a2b529 = (0, $26Zo0$css)`
  gap: ${(props) => props.gap};
  column-gap: ${(props) => props.columnGap};
  row-gap: ${(props) => props.rowGap};
  grid-column: ${(props) => props.gridColumn};
  grid-row: ${(props) => props.gridRow};
  grid-auto-flow: ${(props) => props.gridAutoFlow};
  grid-auto-columns: ${(props) => props.gridAutoColumns};
  grid-auto-rows: ${(props) => props.gridAutoRows};
  grid-template-columns: ${(props) => props.gridTemplateColumns};
  grid-template-rows: ${(props) => props.gridTemplateRows};
  grid-template-areas: ${(props) => props.gridTemplateAreas};
  grid-area: ${(props) => props.gridArea};
  justify-items: ${(props) => props.alignItems};
  align-items: ${(props) => props.alignItems};
  place-items: ${(props) => props.placeItems};
  justify-content: ${(props) => props.justifyContent};
  align-content: ${(props) => props.alignContent};
  place-content: ${(props) => props.placeContent};
  justify-self: ${(props) => props.justifySelf};
  align-self: ${(props) => props.alignSelf};
  place-self: ${(props) => props.placeSelf};
`;

const $62135822dca75810$export$80711e28e77935d5 = (0, $26Zo0$css)`
  color: ${(props) => props.color};
  background-color: ${(props) => props.bgColor};
`;

const $0c9d7cacb3e1505a$export$8eca5bbbbc0c7f55 = (0, $26Zo0$css)`
  position: ${(props) => props.position};
  z-index: ${(props) => props.zIndex};
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
`;

const $9c83c1f11f79e0d1$export$5cc25c17b25332b0 = (0, $26Zo0$css)`
  box-shadow: ${(props) => props.boxShadow};
`;

const $34603d4f3a3fbd9a$export$e7171cddf5044e64 = (0, $26Zo0$css)`
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  min-width: ${(props) => props.minWidth};
  height: ${(props) => props.height};
  max-height: ${(props) => props.maxHeight};
  min-height: ${(props) => props.minHeight};
  box-sizing: ${(props) => props.boxSizing};
`;

const $4742fce91a36bc96$export$661888f3c6187e4c = (0, $26Zo0$css)`
  padding: ${(props) => props.spacing?.p};
  ${(props) =>
    props.spacing?.px &&
    `
    padding-left: ${props.spacing?.px};
    padding-right: ${props.spacing?.px};
  `}
  ${(props) =>
    props.spacing?.py &&
    `
    padding-top: ${props.spacing?.py};
    padding-bottom: ${props.spacing?.py};
  `}
  padding-top: ${(props) => props.spacing?.pt};
  padding-right: ${(props) => props.spacing?.pr};
  padding-bottom: ${(props) => props.spacing?.pb};
  padding-left: ${(props) => props.spacing?.pl};

  margin: ${(props) => props.spacing?.m};
  ${(props) =>
    props.spacing?.mx &&
    `
    margin-left: ${props.spacing?.mx};
    margin-right: ${props.spacing?.mx};
  `}
  ${(props) =>
    props.spacing?.my &&
    `
    margin-top: ${props.spacing?.my};
    margin-bottom: ${props.spacing?.my};
  `}
  margin-top: ${(props) => props.spacing?.mt};
  margin-right: ${(props) => props.spacing?.mr};
  margin-bottom: ${(props) => props.spacing?.mb};
  margin-left: ${(props) => props.spacing?.ml};
`;

const $6c425cf1a0a27663$export$8f688f6a86c9adf3 = (0, $26Zo0$css)`
  font: ${(props) => props.font};
  font-family: ${(props) => props.fontFamily};
  font-size: ${(props) => props.fontSize};
  font-style: ${(props) => props.fontStyle};
  font-weight: ${(props) => props.fontWeight};
  letter-spacing: ${(props) => props.letterSpacing};
  line-height: ${(props) => props.lineHeight};
  text-align: ${(props) => props.textAlign};
  text-transform: ${(props) => props.textTransform};
  word-break: ${(props) => props.wordBreak};
`;

const $2bbb6e2ae1497596$export$ecad260a8a5fef4f = {
  fade: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
    transition: {
      type: "tween",
      ease: "easeIn",
    },
  },
  scale: {
    initial: {
      scale: 0.8,
    },
    animate: {
      scale: 1,
    },
    exit: {
      scale: 0.8,
    },
  },
  selectHover: {
    whileHover: {
      scale: 1.02,
    },
  },
  buttonTap: {
    whileTap: {
      scale: 0.95,
    },
  },
  checkboxTap: {
    whileTap: {
      scale: 0.8,
    },
  },
  radioButtonTap: {
    whileTap: {
      scale: 0.8,
    },
  },
  from(direction, distance = 10) {
    const fromToMap = {
      top: {
        y: `-${distance}px`,
      },
      right: {
        x: `${distance}px`,
      },
      bottom: {
        y: `${distance}px`,
      },
      left: {
        x: `-${distance}px`,
      },
    };
    return {
      initial: fromToMap[direction],
      animate: {
        x: 0,
        y: 0,
      },
      exit: fromToMap[direction],
    };
  },
};

const $e18336266b824a27$export$1edee58a52776cd9 = {
  radius: {
    small: "3px",
    medium: "5px",
    large: "10px",
    round: "50%",
  },
};

const $35597f9f90741844$export$1c5de914b66fe40b = {
  primary: {
    0: "#000000",
    10: "#272738",
    20: "#1D2635",
    30: "#3D113F",
    40: "#5455a9",
    50: "#6d6ec4",
    60: "#8788df",
    70: "#a2a3fc",
    80: "#c1c1ff",
    90: "#e1dfff",
    95: "#f2efff",
    99: "#fffbff",
    100: "#ffffff",
  },
  secondary: {
    0: "#000000",
    10: "#001c3a",
    20: "#00315e",
    30: "#004785",
    40: "#1e5fa6",
    50: "#3f78c0",
    60: "#5b92dc",
    70: "#77adf9",
    80: "#a5c8ff",
    90: "#D9E6FF",
    95: "#ebf1ff",
    99: "#FDFBFF",
    100: "#ffffff",
  },
  tertiary: {
    0: "#000000",
    10: "#001f24",
    20: "#00363d",
    30: "#004f58",
    40: "#006874",
    50: "#008391",
    60: "#00a0b0",
    70: "#22bccf",
    80: "#4fd8eb",
    90: "#97f0ff",
    95: "#d0f8ff",
    99: "#F2F2F2",
    100: "#ffffff",
  },
  success: {
    0: "#000000",
    10: "#002106",
    20: "#00390f",
    30: "#005319",
    40: "#006e24",
    50: "#008a30",
    60: "#18a740",
    70: "#2cb34a",
    80: "#5fe070",
    90: "#7cfd89",
    95: "#c7ffc3",
    99: "#f6fff0",
    100: "#ffffff",
  },
  error: {
    0: "#000000",
    10: "#410002",
    20: "#690005",
    30: "#93000a",
    40: "#ba1a1a",
    50: "#de3730",
    60: "#ff5449",
    70: "#ff897d",
    80: "#ffb4ab",
    90: "#ffdad6",
    95: "#ffedea",
    99: "#fffbff",
    100: "#ffffff",
  },
  warning: {
    0: "#000000",
    10: "#311300",
    20: "#502400",
    30: "#723600",
    40: "#964900",
    50: "#bb5d00",
    60: "#e1730a",
    70: "#ff8e34",
    80: "#ffb786",
    90: "#ffdcc6",
    95: "#ffede4",
    99: "#fffbff",
    100: "#ffffff",
  },
  neutral: {
    0: "#000000",
    10: "#001b3d",
    20: "#003062",
    30: "#00468a",
    40: "#265ea7",
    50: "#4477c1",
    60: "#6091dd",
    70: "#7cacfa",
    80: "#a8c8ff",
    90: "#d6e3ff",
    95: "#FAFAFA",
    99: "#FBFBFF",
    100: "#ffffff",
  },
  neutralVariant: {
    0: "#000000",
    10: "#272838",
    20: "#4F4F4F",
    30: "#47464f",
    40: "#6F6F6F",
    50: "#8C8C8C",
    60: "#898787",
    70: "#BCBCBC",
    80: "#C4C4C4",
    90: "#D4D4D4",
    95: "#D9D9D9",
    99: "#fffbff",
    100: "#ffffff",
  },
  functionAspect: {
    0: "#000000",
    10: "#1c1d00",
    20: "#502400",
    30: "#484a00",
    40: "#606200",
    50: "#797c06",
    60: "#939627",
    70: "#aeb140",
    80: "#FBC913",
    90: "#FFDE7A",
    95: "#FEF445",
    99: "#FFFAA9",
    100: "#ffffff",
  },
  productAspect: {
    0: "#000000",
    10: "#002022",
    20: "#00363a",
    30: "#004f54",
    40: "#006970",
    50: "#00848d",
    60: "#069098",
    70: "#00bdc9",
    80: "#47DDE6",
    90: "#00F0FF",
    95: "#B9F5F9",
    99: "#f4feff",
    100: "#ffffff",
  },
  locationAspect: {
    0: "#000000",
    10: "#0c0664",
    20: "#252478",
    30: "#A300A7",
    40: "#5455a9",
    50: "#6d6ec4",
    60: "#FA00FF",
    70: "#F083F1",
    80: "#c1c1ff",
    90: "#FDCCFE",
    95: "#f2efff",
    99: "#fffbff",
    100: "#ffffff",
  },
};

const $61114810e44226a2$export$55ce6f3a06c59543 = {
  reference: (0, $35597f9f90741844$export$1c5de914b66fe40b),
  text: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[100],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[0],
  },
  primary: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).primary[40],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).primary[99],
  },
  secondary: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).secondary[80],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).secondary[20],
    container: {
      base: (0, $35597f9f90741844$export$1c5de914b66fe40b).secondary[30],
      on: (0, $35597f9f90741844$export$1c5de914b66fe40b).secondary[90],
    },
  },
  tertiary: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).tertiary[80],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).tertiary[20],
    container: {
      base: (0, $35597f9f90741844$export$1c5de914b66fe40b).tertiary[30],
      on: (0, $35597f9f90741844$export$1c5de914b66fe40b).tertiary[90],
    },
  },
  success: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).success[80],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).success[20],
  },
  error: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).error[80],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).error[20],
  },
  warning: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).warning[80],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).warning[10],
  },
  outline: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[40],
  },
  background: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[10],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[100],
    inverse: {
      base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[100],
      on: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[10],
    },
  },
  surface: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutral[0],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutral[99],
    inverse: {
      base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutral[99],
      on: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutral[0],
    },
    variant: {
      base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[30],
      on: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[80],
    },
  },
  shadow: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutral[0],
  },
  pure: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutral[0],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutral[100],
  },
  functionAspect: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).functionAspect[95],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).functionAspect[0],
  },
  productAspect: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).productAspect[90],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).productAspect[0],
  },
  locationAspect: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).locationAspect[60],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).locationAspect[0],
  },
};

const $36e37bba583c65e5$export$a43af521ac8c3202 = {
  reference: (0, $35597f9f90741844$export$1c5de914b66fe40b),
  text: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[10],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[100],
  },
  primary: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).primary[20],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).primary[100],
  },
  secondary: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).secondary[60],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).secondary[100],
    container: {
      base: (0, $35597f9f90741844$export$1c5de914b66fe40b).secondary[95],
      on: (0, $35597f9f90741844$export$1c5de914b66fe40b).secondary[10],
    },
  },
  tertiary: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).tertiary[70],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).tertiary[100],
    container: {
      base: (0, $35597f9f90741844$export$1c5de914b66fe40b).tertiary[95],
      on: (0, $35597f9f90741844$export$1c5de914b66fe40b).tertiary[10],
    },
  },
  success: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).success[70],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).success[100],
  },
  error: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).error[40],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).error[100],
  },
  warning: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).warning[95],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).warning[0],
  },
  outline: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[80],
  },
  background: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[100],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[10],
    inverse: {
      base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[10],
      on: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[100],
    },
  },
  surface: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutral[99],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutral[10],
    inverse: {
      base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutral[10],
      on: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutral[99],
    },
    variant: {
      base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[99],
      on: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutralVariant[20],
    },
  },
  shadow: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutral[0],
  },
  pure: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutral[100],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).neutral[0],
  },
  functionAspect: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).functionAspect[95],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).functionAspect[0],
  },
  productAspect: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).productAspect[90],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).productAspect[0],
  },
  locationAspect: {
    base: (0, $35597f9f90741844$export$1c5de914b66fe40b).locationAspect[60],
    on: (0, $35597f9f90741844$export$1c5de914b66fe40b).locationAspect[0],
  },
};

const $3437fe4e418db6c4$export$2fa187e846a241c4 = {
  breakpoints: {
    phoneMax: 550,
    tabletMax: 1100,
    laptopMax: 1500,
  },
  phoneAndBelow: () => `(max-width: ${$3437fe4e418db6c4$export$2fa187e846a241c4.breakpoints.phoneMax}px)`,
  tabletAndBelow: () => `(max-width: ${$3437fe4e418db6c4$export$2fa187e846a241c4.breakpoints.tabletMax}px)`,
  laptopAndBelow: () => `(max-width: ${$3437fe4e418db6c4$export$2fa187e846a241c4.breakpoints.laptopMax}px)`,
};

const $c8a1a0992d6bf45a$export$b8972b998723d602 = {
  small: "0px 2px 4px hsla(0, 0%, 0%, 0.15)",
  medium: "0 6px 20px -2px hsla(0, 0%, 0%, 0.2)",
  large: "0 15px 50px -10px hsla(0, 0%, 0%, 0.3)",
  xl: "0 25px 80px -15px hsla(0, 0%, 0%, 0.5)",
};

const $60a3d6a4d6eacb27$var$spacingUnit = 8;
const $60a3d6a4d6eacb27$export$5458b64234d1333c = {
  unit: $60a3d6a4d6eacb27$var$spacingUnit,
  xs: "2px",
  s: "4px",
  base: "8px",
  l: "12px",
  xl: "16px",
  xxl: "20px",
  xxxl: "24px",
  multiple: (multiplier) => `${multiplier * $60a3d6a4d6eacb27$var$spacingUnit}px`,
};
const $60a3d6a4d6eacb27$export$ecf38ed398772a1d = () => {
  const partialSpacingSystem = {
    ...$60a3d6a4d6eacb27$export$5458b64234d1333c,
  };
  delete partialSpacingSystem.unit;
  delete partialSpacingSystem.multiple;
  return partialSpacingSystem;
};

const $187520c65909a4c9$export$ca000e230c0caa3e = {
  hover: 0.08,
  focus: 0.12,
  pressed: 0.12,
  dragged: 0.16,
  enabled: 1,
  disabled: 0.12,
};

const $5cd1ddcd7accc57c$var$typefaceReference = {
  brand: '"nunito Sans", sans-serif',
  weights: {
    bold: 700,
    medium: 600,
    normal: 400,
    light: 300,
  },
};
const $5cd1ddcd7accc57c$var$typeScale = {
  size: {
    base: 16,
    n3: 11,
    n2: 12,
    n1: 14,
    p1: 22,
    p2: 24,
    p3: 28,
    p4: 32,
    p5: 36,
    p6: 45,
    p7: 57,
  },
  lineHeight: {
    base: 24,
    n3: 10,
    n2: 16,
    n1: 20,
    p1: 28,
    p2: 32,
    p3: 36,
    p4: 40,
    p5: 44,
    p6: 52,
    p7: 64,
  },
};
const $5cd1ddcd7accc57c$var$typeScaleSystem = {
  size: {
    base: `${$5cd1ddcd7accc57c$var$typeScale.size.base / 16}rem`,
    n3: `${$5cd1ddcd7accc57c$var$typeScale.size.n3 / 16}rem`,
    n2: `${$5cd1ddcd7accc57c$var$typeScale.size.n2 / 16}rem`,
    n1: `${$5cd1ddcd7accc57c$var$typeScale.size.n1 / 16}rem`,
    p1: `${$5cd1ddcd7accc57c$var$typeScale.size.p1 / 16}rem`,
    p2: `${$5cd1ddcd7accc57c$var$typeScale.size.p2 / 16}rem`,
    p3: `${$5cd1ddcd7accc57c$var$typeScale.size.p3 / 16}rem`,
    p4: `${$5cd1ddcd7accc57c$var$typeScale.size.p4 / 16}rem`,
    p5: `${$5cd1ddcd7accc57c$var$typeScale.size.p5 / 16}rem`,
    p6: `${$5cd1ddcd7accc57c$var$typeScale.size.p6 / 16}rem`,
    p7: `${$5cd1ddcd7accc57c$var$typeScale.size.p7 / 16}rem`,
  },
  lineHeight: {
    base: `${$5cd1ddcd7accc57c$var$typeScale.lineHeight.base / 16}rem`,
    n3: `${$5cd1ddcd7accc57c$var$typeScale.lineHeight.n3 / 16}rem`,
    n2: `${$5cd1ddcd7accc57c$var$typeScale.lineHeight.n2 / 16}rem`,
    n1: `${$5cd1ddcd7accc57c$var$typeScale.lineHeight.n1 / 16}rem`,
    p1: `${$5cd1ddcd7accc57c$var$typeScale.lineHeight.p1 / 16}rem`,
    p2: `${$5cd1ddcd7accc57c$var$typeScale.lineHeight.p2 / 16}rem`,
    p3: `${$5cd1ddcd7accc57c$var$typeScale.lineHeight.p3 / 16}rem`,
    p4: `${$5cd1ddcd7accc57c$var$typeScale.lineHeight.p4 / 16}rem`,
    p5: `${$5cd1ddcd7accc57c$var$typeScale.lineHeight.p5 / 16}rem`,
    p6: `${$5cd1ddcd7accc57c$var$typeScale.lineHeight.p6 / 16}rem`,
    p7: `${$5cd1ddcd7accc57c$var$typeScale.lineHeight.p7 / 16}rem`,
  },
};
const $5cd1ddcd7accc57c$var$body = {
  large: {
    tracking: 0.1,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.base,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.normal,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.base,
    letterSpacing: (0, $26Zo0$math)(`0.1 / ${$5cd1ddcd7accc57c$var$typeScale.size.base} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.normal} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.base} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
  medium: {
    tracking: 0,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.n1,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.normal,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.n1,
    letterSpacing: (0, $26Zo0$math)(`0 / ${$5cd1ddcd7accc57c$var$typeScale.size.n1} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.normal} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.n1} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
  small: {
    tracking: 0,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.n2,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.normal,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.n2,
    letterSpacing: (0, $26Zo0$math)(`0 / ${$5cd1ddcd7accc57c$var$typeScale.size.n2} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.normal} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.n2} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
};
const $5cd1ddcd7accc57c$var$display = {
  large: {
    tracking: 0,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.p7,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.normal,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.p7,
    letterSpacing: (0, $26Zo0$math)(`0 / ${$5cd1ddcd7accc57c$var$typeScale.size.p7} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.normal} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.p7} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
  medium: {
    tracking: 0,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.p6,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.normal,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.p6,
    letterSpacing: (0, $26Zo0$math)(`0 / ${$5cd1ddcd7accc57c$var$typeScale.size.p6} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.normal} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.p6} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
  small: {
    tracking: 0,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.p5,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.normal,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.p5,
    letterSpacing: (0, $26Zo0$math)(`0 / ${$5cd1ddcd7accc57c$var$typeScale.size.p5} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.normal} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.p5} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
};
const $5cd1ddcd7accc57c$var$headline = {
  large: {
    tracking: 0,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.p4,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.bold,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.p4,
    letterSpacing: (0, $26Zo0$math)(`0 / ${$5cd1ddcd7accc57c$var$typeScale.size.p4} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.bold} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.p4} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
  medium: {
    tracking: 0,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.p3,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.normal,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.p3,
    letterSpacing: (0, $26Zo0$math)(`0 / ${$5cd1ddcd7accc57c$var$typeScale.size.p3} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.normal} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.p3} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
  small: {
    tracking: 0,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.p2,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.normal,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.p2,
    letterSpacing: (0, $26Zo0$math)(`0 / ${$5cd1ddcd7accc57c$var$typeScale.size.p2} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.normal} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.p2} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
};
const $5cd1ddcd7accc57c$var$label = {
  large: {
    tracking: 0.1,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.n1,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.medium,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.n1,
    letterSpacing: (0, $26Zo0$math)(`0.1 / ${$5cd1ddcd7accc57c$var$typeScale.size.n1} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.medium} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.n1} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
  medium: {
    tracking: 0.5,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.n2,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.medium,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.n2,
    letterSpacing: (0, $26Zo0$math)(`0.5 / ${$5cd1ddcd7accc57c$var$typeScale.size.n2} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.medium} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.n2} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
  small: {
    tracking: 0.5,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.n2,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.medium,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.n3,
    letterSpacing: (0, $26Zo0$math)(`0.5 / ${$5cd1ddcd7accc57c$var$typeScale.size.n2} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.medium} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.n3} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
};
const $5cd1ddcd7accc57c$var$title = {
  large: {
    tracking: 0,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.p1,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.normal,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.p1,
    letterSpacing: (0, $26Zo0$math)(`0 / ${$5cd1ddcd7accc57c$var$typeScale.size.p1} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.normal} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.p1} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
  medium: {
    tracking: 0.15,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.base,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.medium,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.base,
    letterSpacing: (0, $26Zo0$math)(`0.15 / ${$5cd1ddcd7accc57c$var$typeScale.size.base} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.medium} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.base} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
  small: {
    tracking: 0.1,
    size: $5cd1ddcd7accc57c$var$typeScaleSystem.size.n1,
    family: $5cd1ddcd7accc57c$var$typefaceReference.brand,
    weight: $5cd1ddcd7accc57c$var$typefaceReference.weights.medium,
    lineHeight: $5cd1ddcd7accc57c$var$typeScaleSystem.lineHeight.n1,
    letterSpacing: (0, $26Zo0$math)(`0.1 / ${$5cd1ddcd7accc57c$var$typeScale.size.n1} * 1rem`),
    font: `${$5cd1ddcd7accc57c$var$typefaceReference.weights.medium} ${$5cd1ddcd7accc57c$var$typeScaleSystem.size.n1} ${$5cd1ddcd7accc57c$var$typefaceReference.brand}`,
  },
};
const $5cd1ddcd7accc57c$var$roles = {
  display: $5cd1ddcd7accc57c$var$display,
  headline: $5cd1ddcd7accc57c$var$headline,
  title: $5cd1ddcd7accc57c$var$title,
  body: $5cd1ddcd7accc57c$var$body,
  label: $5cd1ddcd7accc57c$var$label,
};
const $5cd1ddcd7accc57c$export$d846a084e680d8e = {
  typeface: $5cd1ddcd7accc57c$var$typefaceReference,
  typeScale: $5cd1ddcd7accc57c$var$typeScale,
  typeScaleSystem: $5cd1ddcd7accc57c$var$typeScaleSystem,
  roles: $5cd1ddcd7accc57c$var$roles,
};

const $529f04d5337d454b$export$bca14c5b3b88a9c9 = {
  border: (0, $e18336266b824a27$export$1edee58a52776cd9),
  color: (0, $36e37bba583c65e5$export$a43af521ac8c3202),
  typography: (0, $5cd1ddcd7accc57c$export$d846a084e680d8e),
  shadow: (0, $c8a1a0992d6bf45a$export$b8972b998723d602),
  spacing: (0, $60a3d6a4d6eacb27$export$5458b64234d1333c),
  state: (0, $187520c65909a4c9$export$ca000e230c0caa3e),
  animation: (0, $2bbb6e2ae1497596$export$ecad260a8a5fef4f),
  queries: (0, $3437fe4e418db6c4$export$2fa187e846a241c4),
};
const $529f04d5337d454b$export$8c5e244d866eaf89 = (colorTheme) => {
  const targetTheme =
    colorTheme === "dark" ? (0, $61114810e44226a2$export$55ce6f3a06c59543) : (0, $36e37bba583c65e5$export$a43af521ac8c3202);
  return {
    ...$529f04d5337d454b$export$bca14c5b3b88a9c9,
    color: {
      ...$529f04d5337d454b$export$bca14c5b3b88a9c9.color,
      ...targetTheme,
    },
  };
};

const $8f10d2c64a99fb76$export$4d9bf56aa526ad8a = (variant) => {
  if (!variant) return "";
  const [type, size] = variant.split("-");
  const textType = (0, $529f04d5337d454b$export$bca14c5b3b88a9c9).typography.roles[type][size];
  return (0, $26Zo0$css)`
    font: ${textType.font};
    letter-spacing: ${textType.letterSpacing};
    line-height: ${textType.lineHeight};
  `;
};

const $b7d68aaa13a893fa$export$107ddc37a9b1adef = (color, opacity) => {
  return (0, $26Zo0$transparentize)(1 - opacity, color);
};

const $67df19b86caf10c5$export$61551dc445ff831d = (0, $26Zo0$css)`
  outline: 1px solid ${(props) => props.theme.mimir.color.primary.base};
  outline-offset: 1px;
`;
const $67df19b86caf10c5$export$d7ddd398f22d79ef = (0, $26Zo0$css)`
  :focus-visible {
    ${$67df19b86caf10c5$export$61551dc445ff831d};
  }
`;

const $70cc044a2d668431$export$c7187bbd1a7a9244 = (0, $26Zo0$css)`
  ::placeholder {
    font: ${(props) => props.theme.mimir.typography.roles.body.medium.font};
    letter-spacing: ${(props) => props.theme.mimir.typography.roles.body.medium.letterSpacing};
    line-height: ${(props) => props.theme.mimir.typography.roles.body.medium.lineHeight};
    color: ${(props) => props.theme.mimir.color.outline.base};
  }
`;

const $54dcd6617557221f$export$f04a61298a47a40f = (0, $26Zo0$styledcomponents).img`
  display: inline-block;
  width: ${(props) => (props.size ? `${props.size}px` : "1em")};
  height: ${(props) => (props.size ? `${props.size}px` : "1em")};
  line-height: 1;
  ${(0, $34603d4f3a3fbd9a$export$e7171cddf5044e64)};
`;

const $de0207036bb3fe06$export$5f1af8db9871e1d6 = (0, $26Zo0$styledcomponents).p`
  ${({ variant: variant }) => (0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)(variant)};
  ${(0, $4742fce91a36bc96$export$661888f3c6187e4c)};
  ${(0, $62135822dca75810$export$80711e28e77935d5)};
  ${(0, $dbede0d07a4a8764$export$f8eec27d1ad18090)};
  ${(0, $67c30f5a5f973bd7$export$66376f8025bd3245)};
  ${(0, $6c425cf1a0a27663$export$8f688f6a86c9adf3)};
  ${(0, $34603d4f3a3fbd9a$export$e7171cddf5044e64)};
`;
$de0207036bb3fe06$export$5f1af8db9871e1d6.displayName = "Text";
$de0207036bb3fe06$export$5f1af8db9871e1d6.defaultProps = {
  useEllipsis: false,
  ellipsisMaxLines: 1,
  htmlFor: "",
};

const $dae5a21217830b5f$export$f813fc8f4e55838d = (color, buttonColor) => {
  const baseColor = buttonColor ? buttonColor : color.primary.base;
  const hoverColor = (0, $26Zo0$lighten)(0.1, baseColor);
  const hoverTextColor = (0, $26Zo0$meetsContrastGuidelines)(color.text.base, hoverColor).AAA ? color.text.base : color.text.on;
  const activeColor = (0, $26Zo0$lighten)(0.3, baseColor);
  const activeTextColor = (0, $26Zo0$meetsContrastGuidelines)(color.text.base, activeColor).AAA ? color.text.base : color.text.on;
  return (0, $26Zo0$css)`
    border: 0;
    background-color: ${baseColor};
    color: ${color.text.on};

    :disabled {
      background-color: ${color.outline.base};
      color: ${color.surface.variant.on};
    }

    :not(:disabled) {
      :hover {
        background-color: ${hoverColor};
        color: ${hoverTextColor};
      }

      :active {
        background-color: ${activeColor};
        color: ${activeTextColor};
      }
    }
  `;
};

const $f9458d64f81958dd$export$607f76eef2332b12 = (color, buttonColor) => {
  const baseColor = buttonColor ? buttonColor : color.primary.base;
  const hoverColor = (0, $26Zo0$lighten)(0.1, baseColor);
  const hoverTextColor = (0, $26Zo0$meetsContrastGuidelines)(color.text.base, hoverColor).AAA ? color.text.base : color.text.on;
  const activeColor = (0, $26Zo0$lighten)(0.3, baseColor);
  const activeTextColor = (0, $26Zo0$meetsContrastGuidelines)(color.text.base, activeColor).AAA ? color.text.base : color.text.on;
  return (0, $26Zo0$css)`
    outline: 0;
    background-color: transparent;
    border: 1px solid ${baseColor};
    color: ${color.text.base};

    :disabled {
      border-color: ${color.outline.base};
      color: ${color.surface.variant.on};
    }

    :not(:disabled) {
      :hover {
        background-color: ${hoverColor};
        color: ${hoverTextColor};
      }

      :active {
        background-color: ${activeColor};
        color: ${activeTextColor};
      }
    }
  `;
};

const $d4535e3db7d9133d$export$89bc7df3c7bdab6a = (color, border) => {
  return (0, $26Zo0$css)`
    height: 50px;
    width: 50px;
    border-width: 0;
    border-radius: ${border.radius.round};
    background-color: ${color.primary.base};
    color: ${color.text.on};

    :disabled {
      background-color: ${color.outline.base};
      color: ${color.surface.variant.on};
    }

    :not(:disabled) {
      :hover {
        background-color: ${(0, $26Zo0$lighten)(0.1, color.primary.base)};
        color: ${color.text.on};
      }

      :active {
        background-color: ${(0, $26Zo0$lighten)(0.3, color.primary.base)};
        color: ${color.text.on};
      }
    }

    img,
    svg {
      max-width: 70%;
      max-height: 70%;
      width: 50%;
      height: 50%;
    }
  `;
};

const $2a28aabfd6e36f95$export$9254cd51d610f2d2 = (color) => (0, $26Zo0$css)`
    border: 0;
    background-color: transparent;
    color: ${color.primary.base};

    :disabled {
      color: ${color.surface.variant.on};
    }

    :not(:disabled) {
      :hover {
        background-color: ${(0, $26Zo0$lighten)(0.1, color.primary.base)};
        color: ${color.text.on};
      }

      :active {
        background-color: ${(0, $26Zo0$lighten)(0.3, color.primary.base)};
        color: ${color.text.on};
      }
    }
  `;

const $f18c9c7bb4682367$export$98cc8723616d1e13 = (theme, buttonColor) => {
  switch (buttonColor) {
    case "primary":
      return theme?.color.primary.base;
    case "success":
      return theme?.color.success.base;
    case "warning":
      return theme?.color.tertiary.base;
    case "danger":
    case "error":
      return theme?.color.error.base;
    default:
      return "";
  }
};

const $3043fc111397f1fc$export$eddf54ea3db8d0f0 = (0, $26Zo0$styledcomponents).button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.mimir.spacing.s};
  flex-direction: ${(props) => props.iconPlacement === "left" && "row-reverse"};

  white-space: nowrap;
  text-decoration: none;

  font: ${(props) => props.theme.mimir.typography.roles.label.large.font};
  line-height: ${(props) => props.theme.mimir.typography.roles.label.large.lineHeight};
  letter-spacing: ${(props) => props.theme.mimir.typography.roles.label.large.letterSpacing};

  height: 32px;
  width: fit-content;
  min-width: 70px;
  padding: ${(props) => props.theme.mimir.spacing.base} ${(props) => props.theme.mimir.spacing.xl};
  border-radius: ${(props) => props.theme.mimir.border.radius.medium};

  :hover {
    cursor: pointer;
  }

  :disabled {
    cursor: not-allowed;
  }

  img,
  svg {
    max-width: 24px;
    max-height: 24px;
  }

  ${(0, $67df19b86caf10c5$export$d7ddd398f22d79ef)};

  ${({ variant: variant, buttonColor: buttonColor, ...props }) => {
    const { color: color, border: border } = props.theme.mimir;
    switch (variant) {
      case "filled":
        return (0, $dae5a21217830b5f$export$f813fc8f4e55838d)(
          color,
          (0, $f18c9c7bb4682367$export$98cc8723616d1e13)(props.theme.mimir, buttonColor)
        );
      case "outlined":
        return (0, $f9458d64f81958dd$export$607f76eef2332b12)(
          color,
          (0, $f18c9c7bb4682367$export$98cc8723616d1e13)(props.theme.mimir, buttonColor)
        );
      case "text":
        return (0, $2a28aabfd6e36f95$export$9254cd51d610f2d2)(color);
      case "round":
        return (0, $d4535e3db7d9133d$export$89bc7df3c7bdab6a)(color, border);
    }
  }};

  ${({ iconOnly: iconOnly, ...props }) =>
    iconOnly &&
    (0, $26Zo0$css)`
      padding: ${props.theme.mimir.spacing.xs};
      min-width: revert;
      width: 24px;
      height: 24px;

      img,
      svg {
        max-width: 18px;
        max-height: 18px;
      }
    `};

  ${(0, $cc3087a9fdba245d$export$4f72868321d0b640)};
  ${(0, $34603d4f3a3fbd9a$export$e7171cddf5044e64)};
  ${(0, $4742fce91a36bc96$export$661888f3c6187e4c)};
`;
$3043fc111397f1fc$export$eddf54ea3db8d0f0.defaultProps = {
  variant: "filled",
  buttonColor: "primary",
};
const $3043fc111397f1fc$export$d65efcde619067e0 = (0, $26Zo0$motion)($3043fc111397f1fc$export$eddf54ea3db8d0f0);

const $696f693fac81a609$export$353f5b6fc5456de1 = /*#__PURE__*/ (0, $26Zo0$forwardRef)((props, ref) => {
  const theme = (0, $26Zo0$useTheme)();
  const {
    children: children,
    icon: icon,
    iconPlacement: iconPlacement,
    iconOnly: iconOnly,
    textVariant: textVariant,
    buttonColor: buttonColor,
    ...delegated
  } = props;
  return /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $3043fc111397f1fc$export$d65efcde619067e0), {
    ref: ref,
    iconOnly: iconOnly,
    iconPlacement: iconPlacement,
    buttonColor: buttonColor,
    ...theme.mimir.animation.buttonTap,
    ...delegated,
    children: [
      icon && iconOnly
        ? /*#__PURE__*/ (0, $26Zo0$jsx)((0, $066b48d8e5b33e52$export$439d29a4e110a164), {
            children: children,
          })
        : /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
            as: "span",
            variant: textVariant,
            children: children,
          }),
      icon &&
        /*#__PURE__*/ ((0, $26Zo0$isValidElement)(icon)
          ? icon
          : /*#__PURE__*/ (0, $26Zo0$jsx)((0, $54dcd6617557221f$export$f04a61298a47a40f), {
              src: String(icon),
              alt: "",
            })),
    ],
  });
});
$696f693fac81a609$export$353f5b6fc5456de1.displayName = "Button";
$696f693fac81a609$export$353f5b6fc5456de1.defaultProps = {
  type: "button",
  iconPlacement: "right",
  textVariant: "body-small",
  buttonColor: "primary",
};

const $ab754ee3829129c7$export$39aecc95f0365819 = ({ condition: condition, wrapper: wrapper, children: children }) => {
  return condition ? wrapper(children) : children;
};

const $0d6276d0028f6bba$export$2e0a83ec2e27ecbb = (0, $26Zo0$styledcomponents)($26Zo0$Root1)`
  background-color: ${(props) => (props.color ? props.color : props.theme.mimir.color.primary.base)};
  margin: 0 auto;
  height: 1px;
  width: 100%;
  flex-shrink: 0;

  ${(props) =>
    props.orientation === "vertical" &&
    (0, $26Zo0$css)`
      height: 100%;
      margin: auto 0;
      width: 1px;
    `}
`;
$0d6276d0028f6bba$export$2e0a83ec2e27ecbb.defaultProps = {
  orientation: "horizontal",
  decorative: false,
};

var $b2b3ee50df44f9d6$export$69674d1480aba23d;
(function (ConnectorDirection) {
  ConnectorDirection[(ConnectorDirection["Input"] = 0)] = "Input";
  ConnectorDirection[(ConnectorDirection["Output"] = 1)] = "Output";
  ConnectorDirection[(ConnectorDirection["Bidirectional"] = 2)] = "Bidirectional";
})($b2b3ee50df44f9d6$export$69674d1480aba23d || ($b2b3ee50df44f9d6$export$69674d1480aba23d = {}));

var $509bbe46974ebdc8$exports = {};

$parcel$export($509bbe46974ebdc8$exports, "FunctionFilterIcon", () => $7c3fa5ba83403cda$export$b4f4531fd95c60ae);
$parcel$export($509bbe46974ebdc8$exports, "FunctionIcon", () => $7c3fa5ba83403cda$export$b9b4845a188be90a);
$parcel$export($509bbe46974ebdc8$exports, "LocationFilterIcon", () => $7c3fa5ba83403cda$export$85bac42bead344b8);
$parcel$export($509bbe46974ebdc8$exports, "LocationIcon", () => $7c3fa5ba83403cda$export$ec1acb4261485f12);
$parcel$export($509bbe46974ebdc8$exports, "ProductFilterIcon", () => $7c3fa5ba83403cda$export$e6314745aeadbdb6);
$parcel$export($509bbe46974ebdc8$exports, "ProductIcon", () => $7c3fa5ba83403cda$export$1a199e029d5e93d6);
$parcel$export($509bbe46974ebdc8$exports, "CheckmarkCheckedIcon", () => $fa408cc5514c0ec6$export$237d50fb1de40e9e);
$parcel$export($509bbe46974ebdc8$exports, "CheckmarkEmptyIcon", () => $fa408cc5514c0ec6$export$189fca6c0c47ab1a);
$parcel$export($509bbe46974ebdc8$exports, "CheckmarkIcon", () => $fa408cc5514c0ec6$export$906a919e30cdbd5c);
$parcel$export($509bbe46974ebdc8$exports, "ConnectorBidirectionalIcon", () => $c3a4bc69ae9a6bdc$export$c11effa3f20b3eeb);
$parcel$export($509bbe46974ebdc8$exports, "ConnectorDownstreamIcon", () => $c3a4bc69ae9a6bdc$export$ad2923f1805795f);
$parcel$export($509bbe46974ebdc8$exports, "ConnectorIcon", () => $c3a4bc69ae9a6bdc$export$b853f99e0a417737);
$parcel$export($509bbe46974ebdc8$exports, "ConnectorLocationIcon", () => $c3a4bc69ae9a6bdc$export$a9a784880f3d4de2);
$parcel$export($509bbe46974ebdc8$exports, "ConnectorProductIcon", () => $c3a4bc69ae9a6bdc$export$a3db873d595466b8);
$parcel$export($509bbe46974ebdc8$exports, "ConnectorTreeviewIcon", () => $c3a4bc69ae9a6bdc$export$a167e600995bf5ba);
$parcel$export($509bbe46974ebdc8$exports, "ConnectorUpstreamIcon", () => $c3a4bc69ae9a6bdc$export$e25dfd17f0cb1f77);
$parcel$export($509bbe46974ebdc8$exports, "ConnectorVerticalIcon", () => $c3a4bc69ae9a6bdc$export$65f64ce45d6e0daa);
$parcel$export($509bbe46974ebdc8$exports, "DeleteActiveIcon", () => $277f0bdbfcbac28f$export$eee90ad03a9b8ce5);
$parcel$export($509bbe46974ebdc8$exports, "DeleteDisabledIcon", () => $277f0bdbfcbac28f$export$42ab64235f40ba6c);
$parcel$export($509bbe46974ebdc8$exports, "DeleteIcon", () => $277f0bdbfcbac28f$export$1ae95d1a7411cb7b);
$parcel$export($509bbe46974ebdc8$exports, "AvatarBackgroundIcon", () => $40d46121288fff2e$export$53ff5d0aaf0f6609);
$parcel$export($509bbe46974ebdc8$exports, "BlockViewActiveIcon", () => $40d46121288fff2e$export$efd394b233411f7a);
$parcel$export($509bbe46974ebdc8$exports, "BlockViewIcon", () => $40d46121288fff2e$export$a01f8070dec64cc0);
$parcel$export($509bbe46974ebdc8$exports, "DarkModeIcon", () => $40d46121288fff2e$export$4e57461601b6b5b2);
$parcel$export($509bbe46974ebdc8$exports, "FilterActiveIcon", () => $40d46121288fff2e$export$dbaed707686283bf);
$parcel$export($509bbe46974ebdc8$exports, "FilterIcon", () => $40d46121288fff2e$export$28f6150e232898de);
$parcel$export($509bbe46974ebdc8$exports, "FitViewIcon", () => $40d46121288fff2e$export$9a28dba4abd131fb);
$parcel$export($509bbe46974ebdc8$exports, "HorizontalIcon", () => $40d46121288fff2e$export$ffa4d1c5f56b2bbd);
$parcel$export($509bbe46974ebdc8$exports, "LightModeIcon", () => $40d46121288fff2e$export$f92a6081e4e1514c);
$parcel$export($509bbe46974ebdc8$exports, "LogoutIcon", () => $40d46121288fff2e$export$2c9e30524eeaa42e);
$parcel$export($509bbe46974ebdc8$exports, "NotificationsIcon", () => $40d46121288fff2e$export$9657eb82c102a97c);
$parcel$export($509bbe46974ebdc8$exports, "SettingsIcon", () => $40d46121288fff2e$export$ac4e8b8ca2b79f39);
$parcel$export($509bbe46974ebdc8$exports, "TreeViewActiveIcon", () => $40d46121288fff2e$export$8b47fbdcab40bc56);
$parcel$export($509bbe46974ebdc8$exports, "TreeViewIcon", () => $40d46121288fff2e$export$d8189acd3db154bf);
$parcel$export($509bbe46974ebdc8$exports, "VerticalIcon", () => $40d46121288fff2e$export$ba9edb5a0ba713fb);
$parcel$export($509bbe46974ebdc8$exports, "LibraryIcon", () => $a375e0e7383bd457$export$3030cdd17ffad81);
$parcel$export($509bbe46974ebdc8$exports, "LockClosedIcon", () => $449944ba453b5c97$export$f53936b98653a113);
$parcel$export($509bbe46974ebdc8$exports, "LockIcon", () => $449944ba453b5c97$export$37ea31f99740f2be);
$parcel$export($509bbe46974ebdc8$exports, "LockOpenIcon", () => $449944ba453b5c97$export$8e05a58e6971f13d);
$parcel$export($509bbe46974ebdc8$exports, "LogoIcon", () => $c1ed2d6fbd8cc8c0$export$eed26074b425133a);
$parcel$export($509bbe46974ebdc8$exports, "CollapseAccordionIcon", () => $22dfeca7b2babd08$export$722f8bfc785472cf);
$parcel$export($509bbe46974ebdc8$exports, "CollapseAccordionNestedIcon", () => $22dfeca7b2babd08$export$fdbed76f4783dfe7);
$parcel$export($509bbe46974ebdc8$exports, "CollapseIcon", () => $22dfeca7b2babd08$export$67cd4f075b72ffc9);
$parcel$export($509bbe46974ebdc8$exports, "CollapseWhiteIcon", () => $22dfeca7b2babd08$export$7ac3ebb6edb0e044);
$parcel$export($509bbe46974ebdc8$exports, "ExpandedAccordionIcon", () => $22dfeca7b2babd08$export$31901d6f7b9068da);
$parcel$export($509bbe46974ebdc8$exports, "ExpandedAccordionNestedIcon", () => $22dfeca7b2babd08$export$ebe6507427cf15eb);
$parcel$export($509bbe46974ebdc8$exports, "ExpandedIcon", () => $22dfeca7b2babd08$export$f5cb197ef241297f);
$parcel$export($509bbe46974ebdc8$exports, "ExpandedWhiteIcon", () => $22dfeca7b2babd08$export$763b5fdab3e2c08b);
$parcel$export($509bbe46974ebdc8$exports, "ToogleDownIcon", () => $22dfeca7b2babd08$export$b0c3ddeace589b20);
$parcel$export($509bbe46974ebdc8$exports, "ToogleUpIcon", () => $22dfeca7b2babd08$export$2d689d9a9f573512);

const $71ea0fe27961e1ac$export$9d5e649303bff8ec = (0, $26Zo0$css)`
  display: inline-block;
  width: ${(props) => (props.size ? `${props.size}px` : "1em")};
  height: ${(props) => (props.size ? `${props.size}px` : "1em")};
  line-height: 1;
  ${(0, $34603d4f3a3fbd9a$export$e7171cddf5044e64)};
`;

const $0098ab9f0c97e3a0$var$SvgFunctionjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 22,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M0 4.07h14.915V18H0V4.07Z",
        fill: "#FEF445",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M7.085 0H22l-7.085 4.07H0L7.085 0Z",
        fill: "#FBC913",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M14.915 4.07 22 0v13.135L14.915 18V4.07Z",
        fill: "#FFDE7A",
      }),
    ],
  });
var $0098ab9f0c97e3a0$export$2e2bcd8739ae039 = $0098ab9f0c97e3a0$var$SvgFunctionjsx;

const $cf91adbba88be1f1$var$SvgFunctionFilterIconjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 22,
    height: 22,
    viewBox: "0 0 22 18",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M.5 4.57h13.915V17.5H.5V4.57Z",
        stroke: "#FFDE7A",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M1.874 3.57 7.218.5h12.908l-5.344 3.07H1.874Z",
        stroke: "#FBC913",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M15.416 17.05V4.36L21.501.864v12.008l-6.085 4.178Z",
        stroke: "#FFDE7A",
      }),
    ],
  });
var $cf91adbba88be1f1$export$2e2bcd8739ae039 = $cf91adbba88be1f1$var$SvgFunctionFilterIconjsx;

const $f5c8376bea29bc40$var$SvgLocationjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 22,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M0 4.07h14.915V18H0V4.07Z",
        fill: "#FA00FF",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M7.085 0H22l-7.085 4.07H0L7.085 0Z",
        fill: "#A300A7",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M14.915 4.07 22 0v13.135L14.915 18V4.07Z",
        fill: "#F083F1",
      }),
    ],
  });
var $f5c8376bea29bc40$export$2e2bcd8739ae039 = $f5c8376bea29bc40$var$SvgLocationjsx;

const $e35ef18c56ab32df$var$SvgLocationFilterIconjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 22,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M.5 4.57h13.915V17.5H.5V4.57Z",
        stroke: "#FA00FF",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M1.874 3.57 7.218.5h12.908l-5.344 3.07H1.874Z",
        stroke: "#A300A7",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M15.416 17.05V4.36L21.501.864v12.008l-6.085 4.178Z",
        stroke: "#F083F1",
      }),
    ],
  });
var $e35ef18c56ab32df$export$2e2bcd8739ae039 = $e35ef18c56ab32df$var$SvgLocationFilterIconjsx;

const $986d17e0707395d6$var$SvgProductjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 22,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M0 4.07h14.915V18H0V4.07Z",
        fill: "#00F0FF",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M7.085 0H22l-7.085 4.07H0L7.085 0Z",
        fill: "#069098",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M14.915 4.07 22 0v13.135L14.915 18V4.07Z",
        fill: "#47DDE6",
      }),
    ],
  });
var $986d17e0707395d6$export$2e2bcd8739ae039 = $986d17e0707395d6$var$SvgProductjsx;

const $bbe41541e30ae9e3$var$SvgProductFilterIconjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 22,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M.5 4.57h13.915V17.5H.5V4.57Z",
        stroke: "#00F0FF",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M1.874 3.57 7.218.5h12.908l-5.344 3.07H1.874Z",
        stroke: "#069098",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M15.416 17.05V4.36L21.501.864v12.008l-6.085 4.178Z",
        stroke: "#47DDE6",
      }),
    ],
  });
var $bbe41541e30ae9e3$export$2e2bcd8739ae039 = $bbe41541e30ae9e3$var$SvgProductFilterIconjsx;

const $7c3fa5ba83403cda$export$b9b4845a188be90a = (0, $26Zo0$styledcomponents)((0, $0098ab9f0c97e3a0$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $7c3fa5ba83403cda$export$b4f4531fd95c60ae = (0, $26Zo0$styledcomponents)((0, $cf91adbba88be1f1$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $7c3fa5ba83403cda$export$ec1acb4261485f12 = (0, $26Zo0$styledcomponents)((0, $f5c8376bea29bc40$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $7c3fa5ba83403cda$export$85bac42bead344b8 = (0, $26Zo0$styledcomponents)((0, $e35ef18c56ab32df$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $7c3fa5ba83403cda$export$1a199e029d5e93d6 = (0, $26Zo0$styledcomponents)((0, $986d17e0707395d6$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $7c3fa5ba83403cda$export$e6314745aeadbdb6 = (0, $26Zo0$styledcomponents)((0, $bbe41541e30ae9e3$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;

const $4fc1bb8a6e516adb$var$SvgCheckmarkjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 18,
    height: 14,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      d: "M5.8 10.9 1.6 6.7.2 8.1l5.6 5.6 12-12L16.4.3 5.8 10.9Z",
      fill: "#000",
    }),
  });
var $4fc1bb8a6e516adb$export$2e2bcd8739ae039 = $4fc1bb8a6e516adb$var$SvgCheckmarkjsx;

const $863eee96975f104e$var$SvgCheckmarkCheckedjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 12,
    height: 12,
    fill: "#3D113F",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M2.111 1H9.89C10.5 1 11 1.5 11 2.111V9.89C11 10.5 10.5 11 9.889 11H2.11C1.5 11 1 10.5 1 9.889V2.11C1 1.5 1.5 1 2.111 1ZM4.5 8.383a.553.553 0 0 0 .783 0l4.211-4.216a.553.553 0 1 0-.783-.784L4.889 7.206l-1.6-1.6a.553.553 0 1 0-.784.783L4.5 8.383Z",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10.667 0H1.333C.6 0 0 .6 0 1.333v9.334C0 11.4.6 12 1.333 12h9.334C11.4 12 12 11.4 12 10.667V1.333C12 .6 11.4 0 10.667 0ZM10 10.667H2A.669.669 0 0 1 1.333 10V2c0-.367.3-.667.667-.667h8c.367 0 .667.3.667.667v8c0 .367-.3.667-.667.667Z",
      }),
    ],
  });
var $863eee96975f104e$export$2e2bcd8739ae039 = $863eee96975f104e$var$SvgCheckmarkCheckedjsx;

const $a1b736553cdfa852$var$SvgCheckmarkEmptyjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 12,
    height: 12,
    fill: "#4F4F4F",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fill: "#fff",
        d: "M1 1h10v10H1z",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10.667 0H1.333C.6 0 0 .6 0 1.333v9.334C0 11.4.6 12 1.333 12h9.334C11.4 12 12 11.4 12 10.667V1.333C12 .6 11.4 0 10.667 0ZM10 10.667H2A.669.669 0 0 1 1.333 10V2c0-.367.3-.667.667-.667h8c.367 0 .667.3.667.667v8c0 .367-.3.667-.667.667Z",
      }),
    ],
  });
var $a1b736553cdfa852$export$2e2bcd8739ae039 = $a1b736553cdfa852$var$SvgCheckmarkEmptyjsx;

const $fa408cc5514c0ec6$export$906a919e30cdbd5c = (0, $26Zo0$styledcomponents)((0, $4fc1bb8a6e516adb$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $fa408cc5514c0ec6$export$237d50fb1de40e9e = (0, $26Zo0$styledcomponents)((0, $863eee96975f104e$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $fa408cc5514c0ec6$export$189fca6c0c47ab1a = (0, $26Zo0$styledcomponents)((0, $a1b736553cdfa852$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;

const $721aed8e14bf2136$var$SvgConnectorBidirectionalIconjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 20,
    height: 20,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("rect", {
        x: 20,
        width: 20,
        height: 20,
        rx: 2,
        transform: "rotate(90 20 0)",
        fill: "current",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M4.447 9.22H1.548a.436.436 0 0 0-.282.768l4.101 3.487L9.47 9.988a.436.436 0 0 0-.282-.769H6.669V5.555H4.447v3.664ZM13.33 10.925h-2.52a.437.437 0 0 1-.283-.77l4.103-3.487 4.103 3.487a.437.437 0 0 1-.283.77h-2.898v3.519h-2.223v-3.52Z",
        fill: "#fff",
      }),
    ],
  });
var $721aed8e14bf2136$export$2e2bcd8739ae039 = $721aed8e14bf2136$var$SvgConnectorBidirectionalIconjsx;

const $18b6e5efc4e6122c$var$SvgConnectorDownstreamIconjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 30,
    height: 30,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("rect", {
        width: 30,
        height: 30,
        rx: 3,
        transform: "matrix(0 -1 -1 0 30 30)",
        fill: "#C05046",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12.5 15.001H4.336a1 1 0 0 0-1 1v.288a1 1 0 0 0 .353.762l10.666 9.066a1 1 0 0 0 1.296 0l10.666-9.066a1 1 0 0 0 .353-.762V16a1 1 0 0 0-1-1H17.5v-3.999a1 1 0 0 1 1-1H30v-5H17.19a4.69 4.69 0 0 0-4.69 4.69v5.31Z",
        fill: "#fff",
      }),
    ],
  });
var $18b6e5efc4e6122c$export$2e2bcd8739ae039 = $18b6e5efc4e6122c$var$SvgConnectorDownstreamIconjsx;

const $1e20321c72fa3048$var$SvgConnectorIconjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 20,
    height: 20,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("rect", {
        width: 20,
        height: 20,
        rx: 2,
        transform: "matrix(-1 0 0 1 20 0)",
        fill: "current",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10 12.28v4.7a.798.798 0 0 0 1.405.517l5.822-6.849a1 1 0 0 0 0-1.295l-5.822-6.85A.798.798 0 0 0 10 3.02v4.815H2.415v4.444H10Z",
        fill: "#fff",
      }),
    ],
  });
var $1e20321c72fa3048$export$2e2bcd8739ae039 = $1e20321c72fa3048$var$SvgConnectorIconjsx;

const $e85467d6ade3b7d4$var$SvgConnectorLocationIconjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 17,
    height: 16,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("rect", {
        width: 16,
        height: 16,
        rx: 2,
        transform: "matrix(-1 0 0 1 16.354 0)",
        fill: "#FA00FF",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M8.343 9.772v3.634c0 .34.286.616.64.616a.65.65 0 0 0 .486-.217l4.556-5.168a.94.94 0 0 0 0-1.251L9.47 2.217A.65.65 0 0 0 8.982 2a.628.628 0 0 0-.64.617v3.72H2.265v3.435h6.079Z",
        fill: "#fff",
      }),
    ],
  });
var $e85467d6ade3b7d4$export$2e2bcd8739ae039 = $e85467d6ade3b7d4$var$SvgConnectorLocationIconjsx;

const $5a50f306add43cb7$var$SvgConnectorProductIconjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 17,
    height: 16,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("rect", {
        width: 16,
        height: 16,
        rx: 2,
        transform: "matrix(-1 0 0 1 16.354 0)",
        fill: "#00F0FF",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M8.343 9.772v3.634c0 .34.286.616.64.616a.65.65 0 0 0 .486-.217l4.556-5.168a.94.94 0 0 0 0-1.251L9.47 2.217A.65.65 0 0 0 8.982 2a.628.628 0 0 0-.64.617v3.72H2.265v3.435h6.079Z",
        fill: "#fff",
      }),
    ],
  });
var $5a50f306add43cb7$export$2e2bcd8739ae039 = $5a50f306add43cb7$var$SvgConnectorProductIconjsx;

const $17b7311e59c37b72$var$SvgConnectorTreeviewIconjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 20,
    height: 20,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("rect", {
        y: 20,
        width: 20,
        height: 20,
        rx: 2,
        transform: "rotate(-90 0 20)",
        fill: "#A0A0A0",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12.28 10h4.7a.798.798 0 0 1 .517 1.405l-6.849 5.822a1 1 0 0 1-1.295 0l-6.85-5.822A.798.798 0 0 1 3.02 10h4.815V2.415h4.444V10Z",
        fill: "#fff",
      }),
    ],
  });
var $17b7311e59c37b72$export$2e2bcd8739ae039 = $17b7311e59c37b72$var$SvgConnectorTreeviewIconjsx;

const $1de9964b0fcf22d3$var$SvgConnectorUpstreamIconjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 30,
    height: 30,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("rect", {
        width: 30,
        height: 30,
        rx: 3,
        transform: "matrix(0 1 1 0 0 0)",
        fill: "#C05046",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M17.5 14.999h8.165a1 1 0 0 0 1-1v-.288a1 1 0 0 0-.352-.762L15.646 3.883a1 1 0 0 0-1.296 0L3.684 12.949a1 1 0 0 0-.353.762V14a1 1 0 0 0 1 1H12.5v3.999a1 1 0 0 1-1 1H0v5h12.81c2.59 0 4.69-2.1 4.69-4.69v-5.31Z",
        fill: "#fff",
      }),
    ],
  });
var $1de9964b0fcf22d3$export$2e2bcd8739ae039 = $1de9964b0fcf22d3$var$SvgConnectorUpstreamIconjsx;

const $4703556025eaabe1$var$SvgConnectorVerticalIconjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 20,
    height: 20,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("rect", {
        y: 20,
        width: 20,
        height: 20,
        rx: 2,
        transform: "rotate(-90 0 20)",
        fill: "current",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M12.28 10h4.7a.798.798 0 0 1 .517 1.405l-6.849 5.822a1 1 0 0 1-1.295 0l-6.85-5.822A.798.798 0 0 1 3.02 10h4.815V2.415h4.444V10Z",
        fill: "#fff",
      }),
    ],
  });
var $4703556025eaabe1$export$2e2bcd8739ae039 = $4703556025eaabe1$var$SvgConnectorVerticalIconjsx;

const $c3a4bc69ae9a6bdc$export$c11effa3f20b3eeb = (0, $26Zo0$styledcomponents)((0, $721aed8e14bf2136$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $c3a4bc69ae9a6bdc$export$ad2923f1805795f = (0, $26Zo0$styledcomponents)((0, $18b6e5efc4e6122c$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $c3a4bc69ae9a6bdc$export$b853f99e0a417737 = (0, $26Zo0$styledcomponents)((0, $1e20321c72fa3048$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $c3a4bc69ae9a6bdc$export$a9a784880f3d4de2 = (0, $26Zo0$styledcomponents)((0, $e85467d6ade3b7d4$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $c3a4bc69ae9a6bdc$export$a3db873d595466b8 = (0, $26Zo0$styledcomponents)((0, $5a50f306add43cb7$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $c3a4bc69ae9a6bdc$export$a167e600995bf5ba = (0, $26Zo0$styledcomponents)((0, $17b7311e59c37b72$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $c3a4bc69ae9a6bdc$export$e25dfd17f0cb1f77 = (0, $26Zo0$styledcomponents)((0, $1de9964b0fcf22d3$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $c3a4bc69ae9a6bdc$export$65f64ce45d6e0daa = (0, $26Zo0$styledcomponents)((0, $4703556025eaabe1$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;

const $fdf44be6477b1fc8$var$SvgDeletejsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 10,
    height: 12,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M1.726 3.022H8.13a.493.493 0 0 1 .366.16.548.548 0 0 1 .151.385v6.251c0 .434-.163.85-.454 1.157-.29.307-.685.48-1.096.48H2.76c-.411 0-.806-.173-1.096-.48a1.684 1.684 0 0 1-.454-1.157v-6.25c0-.145.054-.284.151-.386a.503.503 0 0 1 .366-.16Z",
        stroke: "#4F4F4F",
        strokeMiterlimit: 10,
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M.517 1.55h8.967",
        stroke: "#4F4F4F",
        strokeMiterlimit: 10,
        strokeLinecap: "round",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M3.657.415h2.676c.192 0 .376.08.511.223a.786.786 0 0 1 .212.54H2.924a.8.8 0 0 1 .212-.54.69.69 0 0 1 .511-.224h.01Z",
        stroke: "#4F4F4F",
        strokeWidth: 0.75,
        strokeMiterlimit: 10,
        strokeLinecap: "round",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M2.934 9.48V4.745M5 9.48V4.745M7.056 9.48V4.745",
        stroke: "#4F4F4F",
        strokeWidth: 0.5,
        strokeMiterlimit: 10,
        strokeLinecap: "round",
      }),
    ],
  });
var $fdf44be6477b1fc8$export$2e2bcd8739ae039 = $fdf44be6477b1fc8$var$SvgDeletejsx;

const $b2815a41621677c7$var$SvgDeleteActivejsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 10,
    height: 12,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M1.724 3.02h6.405a.493.493 0 0 1 .365.16.549.549 0 0 1 .151.385v6.25c0 .435-.163.851-.454 1.158-.29.307-.685.48-1.096.48H2.757c-.411 0-.806-.173-1.096-.48a1.684 1.684 0 0 1-.454-1.157V3.565c0-.145.054-.283.151-.386a.503.503 0 0 1 .366-.16Z",
        fill: "#3D113F",
        stroke: "#3D113F",
        strokeMiterlimit: 10,
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M.516 1.547h8.967",
        stroke: "#3D113F",
        strokeMiterlimit: 10,
        strokeLinecap: "round",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M3.655.414h2.676c.192 0 .376.08.511.224a.786.786 0 0 1 .212.54H2.922a.8.8 0 0 1 .212-.54.69.69 0 0 1 .511-.224h.01Z",
        fill: "#3D113F",
        stroke: "#3D113F",
        strokeWidth: 0.75,
        strokeMiterlimit: 10,
        strokeLinecap: "round",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M2.934 9.48V4.747M5 9.48V4.747M7.055 9.48V4.747",
        stroke: "#fff",
        strokeWidth: 0.5,
        strokeMiterlimit: 10,
        strokeLinecap: "round",
      }),
    ],
  });
var $b2815a41621677c7$export$2e2bcd8739ae039 = $b2815a41621677c7$var$SvgDeleteActivejsx;

const $662379d82174ede4$var$SvgDeleteDisabledjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 10,
    height: 12,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M1.724 3.02h6.405a.493.493 0 0 1 .365.16.549.549 0 0 1 .151.385v6.25c0 .435-.163.851-.454 1.158-.29.307-.685.48-1.096.48H2.757c-.411 0-.806-.173-1.096-.48a1.684 1.684 0 0 1-.454-1.157V3.565c0-.145.054-.283.151-.386a.503.503 0 0 1 .366-.16Z",
        stroke: "#AAA",
        strokeMiterlimit: 10,
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M.516 1.547h8.967",
        stroke: "#AAA",
        strokeMiterlimit: 10,
        strokeLinecap: "round",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M3.655.414h2.676c.192 0 .376.08.511.224a.786.786 0 0 1 .212.54H2.922a.8.8 0 0 1 .212-.54.69.69 0 0 1 .511-.224h.01Z",
        stroke: "#AAA",
        strokeWidth: 0.75,
        strokeMiterlimit: 10,
        strokeLinecap: "round",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M2.934 9.48V4.747M5 9.48V4.747M7.055 9.48V4.747",
        stroke: "#AAA",
        strokeWidth: 0.5,
        strokeMiterlimit: 10,
        strokeLinecap: "round",
      }),
    ],
  });
var $662379d82174ede4$export$2e2bcd8739ae039 = $662379d82174ede4$var$SvgDeleteDisabledjsx;

const $277f0bdbfcbac28f$export$1ae95d1a7411cb7b = (0, $26Zo0$styledcomponents)((0, $fdf44be6477b1fc8$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $277f0bdbfcbac28f$export$eee90ad03a9b8ce5 = (0, $26Zo0$styledcomponents)((0, $b2815a41621677c7$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $277f0bdbfcbac28f$export$42ab64235f40ba6c = (0, $26Zo0$styledcomponents)((0, $662379d82174ede4$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;

const $20dc2e464e5503a1$var$SvgAvatarBackgroundjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 36,
    height: 37,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("circle", {
      cx: 18,
      cy: 18.403,
      r: 18,
      fill: "#D6D8EE",
    }),
  });
var $20dc2e464e5503a1$export$2e2bcd8739ae039 = $20dc2e464e5503a1$var$SvgAvatarBackgroundjsx;

const $1644f8788dee848a$var$SvgBlockViewjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 14,
    height: 14,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1.75 1.75v10.5h10.5V1.75H1.75ZM1.167 0C.522 0 0 .522 0 1.167v11.666C0 13.478.522 14 1.167 14h11.666c.645 0 1.167-.522 1.167-1.167V1.167C14 .522 13.478 0 12.833 0H1.167Z",
        fill: "#4F4F4F",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10.5 7H7v3.5h3.5V7ZM7 5.833c-.644 0-1.167.523-1.167 1.167v3.5c0 .644.523 1.167 1.167 1.167h3.5c.644 0 1.167-.523 1.167-1.167V7c0-.644-.523-1.167-1.167-1.167H7Z",
        fill: "#4F4F4F",
      }),
    ],
  });
var $1644f8788dee848a$export$2e2bcd8739ae039 = $1644f8788dee848a$var$SvgBlockViewjsx;

const $5c9df7cf2e16654e$var$SvgBlockViewActivejsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 14,
    height: 14,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1.75 1.75v10.5h10.5V1.75H1.75ZM1.167 0C.522 0 0 .522 0 1.167v11.666C0 13.478.522 14 1.167 14h11.666c.645 0 1.167-.522 1.167-1.167V1.167C14 .522 13.478 0 12.833 0H1.167Z",
        fill: "#fff",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M10.5 7H7v3.5h3.5V7ZM7 5.833c-.644 0-1.167.523-1.167 1.167v3.5c0 .644.523 1.167 1.167 1.167h3.5c.644 0 1.167-.523 1.167-1.167V7c0-.644-.523-1.167-1.167-1.167H7Z",
        fill: "#fff",
      }),
    ],
  });
var $5c9df7cf2e16654e$export$2e2bcd8739ae039 = $5c9df7cf2e16654e$var$SvgBlockViewActivejsx;

const $7a32414d88e8376b$var$SvgDarkmodejsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 11,
    height: 16,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M10.5.398a8.003 8.003 0 0 0 0 15.204 8 8 0 1 1 0-15.203Z",
      fill: "#272738",
    }),
  });
var $7a32414d88e8376b$export$2e2bcd8739ae039 = $7a32414d88e8376b$var$SvgDarkmodejsx;

const $21daa8bb6934d821$var$SvgFilterjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 12,
    height: 14,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1.894 1.762 6 7.153l4.106-5.39H1.894Zm-1.579.655C-.412 1.463.2 0 1.325 0h9.35c1.126 0 1.737 1.463 1.01 2.417l-4.676 6.14c-.528.693-1.49.693-2.018 0L.315 2.417Z",
        fill: "#4F4F4F",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6 7.636c.438 0 .793.395.793.881v4.602c0 .486-.355.881-.793.881-.438 0-.793-.395-.793-.881V8.517c0-.486.355-.88.793-.88Z",
        fill: "#4F4F4F",
      }),
    ],
  });
var $21daa8bb6934d821$export$2e2bcd8739ae039 = $21daa8bb6934d821$var$SvgFilterjsx;

const $5cb281d68141fa31$var$SvgFilterActivejsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 12,
    height: 14,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1.894 1.762 6 7.153l4.106-5.39H1.894Zm-1.579.655C-.412 1.463.2 0 1.325 0h9.35c1.126 0 1.737 1.463 1.01 2.417l-4.676 6.14c-.528.693-1.49.693-2.018 0L.315 2.417Z",
        fill: "#fff",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M6 7.636c.438 0 .793.395.793.881v4.602c0 .486-.355.881-.793.881-.438 0-.793-.395-.793-.881V8.517c0-.486.355-.88.793-.88Z",
        fill: "#fff",
      }),
    ],
  });
var $5cb281d68141fa31$export$2e2bcd8739ae039 = $5cb281d68141fa31$var$SvgFilterActivejsx;

const $7ee8081b7afa024b$var$SvgFitViewjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 14,
    height: 14,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M2 5H0V0h5v2H2v3ZM0 9h2v3h3v2H0V9Zm12 3H9v2h5V9h-2v3ZM9 2V0h5v5h-2V2H9Z",
      fill: "#272738",
    }),
  });
var $7ee8081b7afa024b$export$2e2bcd8739ae039 = $7ee8081b7afa024b$var$SvgFitViewjsx;

const $e00f8b090bd7eef9$var$SvgHorizontaljsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 14,
    height: 10,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M.059 1.25C.059.56.48 0 .999 0h6.083c.52 0 .941.56.941 1.25v2.813h3.486l-1.71-2.13C9.515 1.58 9.5.988 9.767.61c.267-.378.713-.397.998-.043l3.004 3.741c.142.172.23.419.23.693 0 .274-.088.521-.23.692l-3.004 3.742c-.285.354-.732.335-.998-.043-.267-.378-.252-.97.032-1.325l1.71-2.129H8.023V8.75c0 .69-.421 1.25-.941 1.25H1c-.52 0-.941-.56-.941-1.25v-7.5ZM1.47 8.125v-6.25h5.141v6.25h-5.14Z",
      fill: "#4F4F4F",
    }),
  });
var $e00f8b090bd7eef9$export$2e2bcd8739ae039 = $e00f8b090bd7eef9$var$SvgHorizontaljsx;

const $69fdb0b2b028b4bc$var$SvgLightModejsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 18,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("circle", {
        cx: 9.25,
        cy: 9.228,
        r: 4.736,
        stroke: "#272738",
        strokeWidth: 1.5,
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M9.25 17v-1.372M9.25 2.371V1M17.25 9H15.88M2.621 9H1.25M14.907 14.657l-.97-.97M4.563 4.313l-.97-.97M3.593 14.657l.97-.97M13.937 4.313l.97-.97",
        stroke: "#272738",
        strokeWidth: 1.5,
        strokeLinecap: "round",
      }),
    ],
  });
var $69fdb0b2b028b4bc$export$2e2bcd8739ae039 = $69fdb0b2b028b4bc$var$SvgLightModejsx;

const $6669debc2d6183b6$var$SvgLogoutjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 12,
    height: 16,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M0 0h10a2 2 0 0 1 2 2v9.915a2 2 0 0 1-2.083 1.998L0 13.5V0Z",
        fill: "#272738",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M.75 12.974V.935l8.43 1.873c.572.127.98.635.98 1.22v9.479c0 .8-.741 1.393-1.522 1.22L.75 12.974Z",
        fill: "#fff",
        stroke: "#272738",
        strokeWidth: 1.5,
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "m6.545 9 2.182.5v.849l-2.182-.5V9Z",
        fill: "#272738",
      }),
    ],
  });
var $6669debc2d6183b6$export$2e2bcd8739ae039 = $6669debc2d6183b6$var$SvgLogoutjsx;

const $2e3df9f7161051f7$var$SvgNotificationsjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 15,
    height: 16,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "m7.618 14.473.109-.408-1.922-.519-.108.409c-.13.486-.3 1.043.01 1.439.115.149.289.278.544.347a.99.99 0 0 0 .644-.026c.464-.188.594-.756.723-1.242Z",
        fill: "#272738",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "m1 12 11.532 3.111",
        stroke: "#272738",
        strokeWidth: 1.5,
        strokeLinecap: "round",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M8.912 2.512a5.71 5.71 0 0 0-3.109.447C4.62 3.501 3.57 4.53 3.178 6.002l-1.795 6.745 10.571 2.852 1.795-6.745c.392-1.473-.006-2.892-.762-3.957a5.751 5.751 0 0 0-2.47-1.953.973.973 0 0 1-.928.253.98.98 0 0 1-.677-.685Zm.4 1.73c2.123.573 3.464 2.464 2.996 4.223l-1.378 5.177-7.688-2.074L4.619 6.39c.469-1.76 2.57-2.721 4.692-2.149Z",
        fill: "#272738",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("ellipse", {
        rx: 0.995,
        ry: 1.001,
        transform: "rotate(15.073 .422 38.836) skewX(.145)",
        fill: "#272738",
      }),
    ],
  });
var $2e3df9f7161051f7$export$2e2bcd8739ae039 = $2e3df9f7161051f7$var$SvgNotificationsjsx;

const $5d452190db0950b5$var$SvgSettingsjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 16,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M1 15h14",
        stroke: "#272838",
        strokeWidth: 1.5,
        strokeMiterlimit: 10,
        strokeLinecap: "round",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M6 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
        fill: "#fff",
        stroke: "#272838",
        strokeMiterlimit: 10,
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M1 9h14",
        stroke: "#272838",
        strokeWidth: 1.5,
        strokeMiterlimit: 10,
        strokeLinecap: "round",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
        fill: "#fff",
        stroke: "#272838",
        strokeMiterlimit: 10,
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M1 3h14",
        stroke: "#272838",
        strokeWidth: 1.5,
        strokeMiterlimit: 10,
        strokeLinecap: "round",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "M4 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
        fill: "#fff",
        stroke: "#272838",
        strokeMiterlimit: 10,
      }),
    ],
  });
var $5d452190db0950b5$export$2e2bcd8739ae039 = $5d452190db0950b5$var$SvgSettingsjsx;

const $b76155c50215edf9$var$SvgTreeViewjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 19,
    height: 14,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      d: "M7.5 0a.764.764 0 0 0-.75.778v3.11c0 .43.336.779.75.779h1.125V6.61H2.25A.382.382 0 0 0 1.875 7v2.333H.75a.764.764 0 0 0-.75.778v3.111c0 .43.336.778.75.778h3c.414 0 .75-.348.75-.778v-3.11a.764.764 0 0 0-.75-.779H2.625V7.39h6v1.944H7.5a.764.764 0 0 0-.75.778v3.111c0 .43.336.778.75.778h3c.414 0 .75-.348.75-.778v-3.11a.764.764 0 0 0-.75-.779H9.375V7.39h6v1.944H14.25a.764.764 0 0 0-.75.778v3.111c0 .43.336.778.75.778h3c.414 0 .75-.348.75-.778v-3.11a.764.764 0 0 0-.75-.779h-1.125V7a.396.396 0 0 0-.11-.275.368.368 0 0 0-.265-.114H9.375V4.667H10.5c.414 0 .75-.349.75-.778V.778A.764.764 0 0 0 10.5 0h-3Z",
      fill: "#4F4F4F",
    }),
  });
var $b76155c50215edf9$export$2e2bcd8739ae039 = $b76155c50215edf9$var$SvgTreeViewjsx;

const $5755a32a428ce912$var$SvgTreeViewActivejsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 19,
    height: 14,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      d: "M7.5 0a.764.764 0 0 0-.75.778v3.11c0 .43.336.779.75.779h1.125V6.61H2.25A.382.382 0 0 0 1.875 7v2.333H.75a.764.764 0 0 0-.75.778v3.111c0 .43.336.778.75.778h3c.414 0 .75-.348.75-.778v-3.11a.764.764 0 0 0-.75-.779H2.625V7.39h6v1.944H7.5a.764.764 0 0 0-.75.778v3.111c0 .43.336.778.75.778h3c.414 0 .75-.348.75-.778v-3.11a.764.764 0 0 0-.75-.779H9.375V7.39h6v1.944H14.25a.764.764 0 0 0-.75.778v3.111c0 .43.336.778.75.778h3c.414 0 .75-.348.75-.778v-3.11a.764.764 0 0 0-.75-.779h-1.125V7a.396.396 0 0 0-.11-.275.368.368 0 0 0-.265-.114H9.375V4.667H10.5c.414 0 .75-.349.75-.778V.778A.764.764 0 0 0 10.5 0h-3Z",
      fill: "#fff",
    }),
  });
var $5755a32a428ce912$export$2e2bcd8739ae039 = $5755a32a428ce912$var$SvgTreeViewActivejsx;

const $6ae8a82d80271fb1$var$SvgVerticaljsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 10,
    height: 14,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M8.75 0C9.44 0 10 .421 10 .941v6.141c0 .52-.56.941-1.25.941H5.937v3.486l2.13-1.71c.353-.284.946-.298 1.324-.032.378.267.397.714.043.998L5.693 13.77C5.52 13.91 5.274 14 5 14c-.274 0-.521-.089-.692-.23L.566 10.765c-.354-.284-.335-.731.043-.998.378-.266.97-.252 1.325.033l2.128 1.709V8.024H1.25C.56 8.023 0 7.601 0 7.081V.942C0 .421.56 0 1.25 0h7.5ZM1.875 1.412h6.25v5.2h-6.25v-5.2Z",
      fill: "#4F4F4F",
    }),
  });
var $6ae8a82d80271fb1$export$2e2bcd8739ae039 = $6ae8a82d80271fb1$var$SvgVerticaljsx;

const $40d46121288fff2e$export$53ff5d0aaf0f6609 = (0, $26Zo0$styledcomponents)((0, $20dc2e464e5503a1$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $40d46121288fff2e$export$a01f8070dec64cc0 = (0, $26Zo0$styledcomponents)((0, $1644f8788dee848a$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $40d46121288fff2e$export$efd394b233411f7a = (0, $26Zo0$styledcomponents)((0, $5c9df7cf2e16654e$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $40d46121288fff2e$export$4e57461601b6b5b2 = (0, $26Zo0$styledcomponents)((0, $7a32414d88e8376b$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $40d46121288fff2e$export$28f6150e232898de = (0, $26Zo0$styledcomponents)((0, $21daa8bb6934d821$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $40d46121288fff2e$export$dbaed707686283bf = (0, $26Zo0$styledcomponents)((0, $5cb281d68141fa31$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $40d46121288fff2e$export$9a28dba4abd131fb = (0, $26Zo0$styledcomponents)((0, $7ee8081b7afa024b$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $40d46121288fff2e$export$ffa4d1c5f56b2bbd = (0, $26Zo0$styledcomponents)((0, $e00f8b090bd7eef9$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $40d46121288fff2e$export$f92a6081e4e1514c = (0, $26Zo0$styledcomponents)((0, $69fdb0b2b028b4bc$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $40d46121288fff2e$export$2c9e30524eeaa42e = (0, $26Zo0$styledcomponents)((0, $6669debc2d6183b6$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $40d46121288fff2e$export$9657eb82c102a97c = (0, $26Zo0$styledcomponents)((0, $2e3df9f7161051f7$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $40d46121288fff2e$export$ac4e8b8ca2b79f39 = (0, $26Zo0$styledcomponents)((0, $5d452190db0950b5$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $40d46121288fff2e$export$d8189acd3db154bf = (0, $26Zo0$styledcomponents)((0, $b76155c50215edf9$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $40d46121288fff2e$export$8b47fbdcab40bc56 = (0, $26Zo0$styledcomponents)((0, $5755a32a428ce912$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $40d46121288fff2e$export$ba9edb5a0ba713fb = (0, $26Zo0$styledcomponents)((0, $6ae8a82d80271fb1$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;

const $a2629f1bc8304ce1$var$SvgLibraryjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    viewBox: "0 0 24 25",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "m.519 6.645 10-5.824C11.185.433 12 .944 12 1.75V17.8c0 .388-.199.744-.519.93l-10 5.825C.815 24.944 0 24.433 0 23.626V7.575c0-.387.199-.744.519-.93Z",
        fill: "#fff",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M1.5 7.889v14.84l9-5.241V2.648l-9 5.24Zm9.259 9.448.241.465-.24-.465h-.001ZM10.519.821l-10 5.824c-.32.186-.519.543-.519.93v16.051c0 .806.815 1.318 1.481.93l10-5.824c.32-.187.519-.543.519-.93V1.75c0-.807-.815-1.318-1.481-.93Z",
        fill: "#272738",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "m6.519 6.645 10-5.824C17.185.433 18 .944 18 1.75V17.8c0 .388-.199.744-.519.93l-10 5.825c-.666.388-1.481-.123-1.481-.93V7.575c0-.387.199-.744.519-.93Z",
        fill: "#fff",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M7.5 7.889v14.84l9-5.241V2.648l-9 5.24Zm9.259 9.448.241.465-.24-.465h-.001ZM16.519.821l-10 5.824c-.32.186-.519.543-.519.93v16.051c0 .806.815 1.318 1.481.93l10-5.824c.32-.187.519-.543.519-.93V1.75c0-.807-.815-1.318-1.481-.93Z",
        fill: "#272738",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        d: "m12.519 6.645 10-5.824C23.185.433 24 .944 24 1.75V17.8c0 .388-.199.744-.519.93l-10 5.825c-.666.388-1.481-.123-1.481-.93V7.575c0-.387.199-.744.519-.93Z",
        fill: "#fff",
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M13.5 7.889v14.84l9-5.241V2.648l-9 5.24Zm9.259 9.448.241.465-.24-.465h-.001ZM22.519.821l-10 5.824c-.32.186-.519.543-.519.93v16.051c0 .806.815 1.318 1.481.93l10-5.824c.32-.187.519-.543.519-.93V1.75c0-.807-.815-1.318-1.481-.93Z",
        fill: "#272738",
      }),
    ],
  });
var $a2629f1bc8304ce1$export$2e2bcd8739ae039 = $a2629f1bc8304ce1$var$SvgLibraryjsx;

const $a375e0e7383bd457$export$3030cdd17ffad81 = (0, $26Zo0$styledcomponents)((0, $a2629f1bc8304ce1$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;

const $8fcc7c65ec36492f$var$SvgLockjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 18,
    height: 18,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M12.75 6.375h.75c.825 0 1.5.675 1.5 1.5v7.5c0 .825-.675 1.5-1.5 1.5h-9c-.825 0-1.5-.675-1.5-1.5v-7.5c0-.825.675-1.5 1.5-1.5h.75v-1.5c0-2.07 1.68-3.75 3.75-3.75 2.07 0 3.75 1.68 3.75 3.75v1.5ZM9 2.625a2.247 2.247 0 0 0-2.25 2.25v1.5h4.5v-1.5A2.247 2.247 0 0 0 9 2.625Zm-4.5 12.75v-7.5h9v7.5h-9Zm6-3.75c0 .825-.675 1.5-1.5 1.5s-1.5-.675-1.5-1.5.675-1.5 1.5-1.5 1.5.675 1.5 1.5Z",
      fill: "#272738",
    }),
  });
var $8fcc7c65ec36492f$export$2e2bcd8739ae039 = $8fcc7c65ec36492f$var$SvgLockjsx;

const $3c20a706656e0d4e$var$SvgLockClosedjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)("svg", {
    width: 10,
    height: 12,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)("g", {
        clipPath: "url(#lockClosed_jsx_svg__a)",
        children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M8.135 4.036h.568c.347 0 .68.126.925.35.245.224.383.528.383.845v5.544c0 .157-.034.313-.1.458a1.195 1.195 0 0 1-.283.387c-.122.111-.266.2-.424.26-.16.06-.33.09-.5.09H1.307c-.172 0-.342-.03-.5-.09a1.322 1.322 0 0 1-.425-.26 1.195 1.195 0 0 1-.283-.387c-.066-.145-.1-.3-.1-.458V5.192a1.15 1.15 0 0 1 .398-.82c.244-.216.57-.336.91-.336h.482a.055.055 0 0 0 0-.059v-.98a2.78 2.78 0 0 1 .696-1.89A3.272 3.272 0 0 1 4.34.06 3.43 3.43 0 0 1 5.568.043c.406.068.794.21 1.14.415.347.206.646.472.88.783.233.312.397.662.483 1.032.043.19.064.383.064.578v1.185Zm-3.398-2.88c-.454.078-.863.299-1.157.625a1.71 1.71 0 0 0-.45 1.158v.98a.056.056 0 0 0-.017.038c0 .015.006.029.017.04H6.88V2.85c0-.455-.198-.891-.55-1.213a1.969 1.969 0 0 0-1.326-.502l-.268.02ZM6.26 7.954c.01.227-.053.45-.182.644a1.223 1.223 0 0 1-.542.443 1.36 1.36 0 0 1-.72.094 1.306 1.306 0 0 1-.657-.289 1.13 1.13 0 0 1-.37-.572 1.053 1.053 0 0 1 .04-.664c.085-.213.237-.398.437-.532a1.331 1.331 0 0 1 1.587.083c.244.205.39.49.407.793Z",
          fill: "#000",
        }),
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)("defs", {
        children: /*#__PURE__*/ (0, $26Zo0$jsx)("clipPath", {
          id: "lockClosed_jsx_svg__a",
          children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
            fill: "#fff",
            d: "M0 0h10v12H0z",
          }),
        }),
      }),
    ],
  });
var $3c20a706656e0d4e$export$2e2bcd8739ae039 = $3c20a706656e0d4e$var$SvgLockClosedjsx;

const $74b414c0270b1e7c$var$SvgLockOpenjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 10,
    height: 12,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M8.75 4h-.625V2.857C8.125 1.28 6.725 0 5 0S1.875 1.28 1.875 2.857h1.25c0-.948.837-1.714 1.875-1.714 1.037 0 1.875.766 1.875 1.714V4H1.25C.562 4 0 4.514 0 5.143v5.714C0 11.486.563 12 1.25 12h7.5c.688 0 1.25-.514 1.25-1.143V5.143C10 4.514 9.437 4 8.75 4Zm-7.5 6.857V5.143h7.5v5.714h-7.5ZM6.25 8c0 .629-.563 1.143-1.25 1.143-.688 0-1.25-.514-1.25-1.143S4.313 6.857 5 6.857c.688 0 1.25.514 1.25 1.143Z",
      fill: "#565656",
    }),
  });
var $74b414c0270b1e7c$export$2e2bcd8739ae039 = $74b414c0270b1e7c$var$SvgLockOpenjsx;

const $449944ba453b5c97$export$37ea31f99740f2be = (0, $26Zo0$styledcomponents)((0, $8fcc7c65ec36492f$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $449944ba453b5c97$export$f53936b98653a113 = (0, $26Zo0$styledcomponents)((0, $3c20a706656e0d4e$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $449944ba453b5c97$export$8e05a58e6971f13d = (0, $26Zo0$styledcomponents)((0, $74b414c0270b1e7c$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;

const $3b786c1b6074d8c9$var$SvgLogojsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    viewBox: "0 0 225.74 58.23",
    fill: "currentColor",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      d: "m15.73 33.63 29.88-3.22c4.32-.42 4.74-1.61 4.74-4.06 0-1.27-1.61-4.57-8.29-4.57h-19.7v-7.7h19.63c11.09 0 17.61 5.76 17.61 14.05v16.42c0 9.4-8.55 13.63-17.69 13.63H15.99c-9.31 0-16-5.93-16-12.11 0-5.58 6.18-11.43 15.74-12.44m.26 17.18h25.88c5.16 0 8.72-2.71 8.72-5.93v-4.15c0-2.79-1.36-3.73-4.49-3.39C32.39 38.95 8.94 39.12 8.94 46c0 2.54 2.12 4.83 7 4.83M71.82 10a5 5 0 1 1 5.33-5 5.14 5.14 0 0 1-5.27 5h-.06m-4.74 4.12h9.4v43.63h-9.4Zm60.85 44.11h-25.94c-13.46 0-17.61-8.55-17.61-12.87V.67h9.23v7.95c0 2.46 3.13 5.5 8 5.5h26.28c9.57 0 17.61 5 17.61 12.78v18.42c0 4.32-4.15 12.87-17.61 12.87m8.38-31.32c0-2.54-3.22-5.33-8.38-5.33h-25.9c-5.16 0-8.38 2.79-8.38 5.33v18.45c0 2.45 3.13 5 8.38 5h25.9c5.25 0 8.38-2.54 8.38-5Zm59.21 11.79-29.88 3.22c-4.32.42-4.74 1.61-4.74 4.06 0 1.27 1.61 4.57 8.29 4.57h20.35v7.71h-20.26c-11.09 0-17.61-5.76-17.61-14.05V27.74c0-9.4 8.55-13.63 17.69-13.63h25.9c9.31 0 16 5.93 16 12.11 0 5.59-6.18 11.43-15.75 12.44m-.26-17.18h-25.9c-5.16 0-8.72 2.71-8.72 5.92v4.15c0 2.79 1.35 3.72 4.49 3.39 13.71-1.61 37.16-1.78 37.16-8.64 0-2.54-2.12-4.82-7-4.82M216.51.67h9.23V58.2h-9.23z",
    }),
  });
var $3b786c1b6074d8c9$export$2e2bcd8739ae039 = $3b786c1b6074d8c9$var$SvgLogojsx;

const $c1ed2d6fbd8cc8c0$export$eed26074b425133a = (0, $26Zo0$styledcomponents)((0, $3b786c1b6074d8c9$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
$c1ed2d6fbd8cc8c0$export$eed26074b425133a.defaultProps = {
  width: "100px",
  height: "25px",
};

const $739f5af0c0f8f8ff$var$SvgCollapsejsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 10,
    height: 6,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      d: "M.605.554a.82.82 0 0 1 1.14 0L5 3.708 8.254.554A.82.82 0 0 1 9.395 1.73L5.697 5.322a1 1 0 0 1-1.394 0L.605 1.729a.82.82 0 0 1 0-1.175Z",
      fill: "#272738",
    }),
  });
var $739f5af0c0f8f8ff$export$2e2bcd8739ae039 = $739f5af0c0f8f8ff$var$SvgCollapsejsx;

const $a1480bdc5bf254a2$var$SvgCollapseAccordionjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 8,
    height: 4,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      d: "M.874 4C.097 4-.292 3.229.257 2.778L3.383.21c.341-.28.893-.28 1.234 0l3.126 2.568c.55.45.16 1.222-.617 1.222H.874Z",
      fill: "#272738",
    }),
  });
var $a1480bdc5bf254a2$export$2e2bcd8739ae039 = $a1480bdc5bf254a2$var$SvgCollapseAccordionjsx;

const $4fb3fcf3bdca47b8$var$SvgCollapseAccordionNestedjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 8,
    height: 4,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      d: "M.874 3.5c-.222 0-.328-.105-.36-.167a.106.106 0 0 1-.012-.071c.003-.014.014-.05.072-.098L3.701.596a.514.514 0 0 1 .598 0l3.127 2.568c.058.048.07.084.072.098a.106.106 0 0 1-.013.07c-.03.063-.137.168-.359.168H.874Z",
      stroke: "#272738",
    }),
  });
var $4fb3fcf3bdca47b8$export$2e2bcd8739ae039 = $4fb3fcf3bdca47b8$var$SvgCollapseAccordionNestedjsx;

const $aac0759694a6e12a$var$SvgCollapseWhitejsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 8,
    height: 4,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      d: "M.874 4C.097 4-.292 3.229.257 2.778L3.383.21c.341-.28.893-.28 1.234 0l3.126 2.568c.55.45.16 1.222-.617 1.222H.874Z",
      fill: "#fff",
    }),
  });
var $aac0759694a6e12a$export$2e2bcd8739ae039 = $aac0759694a6e12a$var$SvgCollapseWhitejsx;

const $bdf51a7dec640889$var$SvgExpandjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 10,
    height: 6,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      d: "M8.971 5.25a.748.748 0 0 1-1.058 0L5 2.345 2.087 5.25a.748.748 0 0 1-1.058-1.059L4.293.928a1 1 0 0 1 1.414 0l3.264 3.264a.748.748 0 0 1 0 1.058Z",
      fill: "#272738",
    }),
  });
var $bdf51a7dec640889$export$2e2bcd8739ae039 = $bdf51a7dec640889$var$SvgExpandjsx;

const $db5f028399063109$var$SvgExpandAccordionjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 8,
    height: 4,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      d: "M.874 0C.097 0-.292.771.257 1.222L3.383 3.79c.341.28.893.28 1.234 0l3.126-2.568C8.293.772 7.903 0 7.126 0H.874Z",
      fill: "#272738",
    }),
  });
var $db5f028399063109$export$2e2bcd8739ae039 = $db5f028399063109$var$SvgExpandAccordionjsx;

const $96c31682f66704ee$var$SvgExpandAccordionNestedjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 8,
    height: 4,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      d: "M7.126.5c.222 0 .328.105.36.167a.106.106 0 0 1 .012.07c-.003.015-.014.051-.072.1L4.299 3.403a.514.514 0 0 1-.598 0L.574.836C.516.788.504.752.502.738a.106.106 0 0 1 .013-.07C.545.604.652.5.874.5h6.252Z",
      stroke: "#272738",
    }),
  });
var $96c31682f66704ee$export$2e2bcd8739ae039 = $96c31682f66704ee$var$SvgExpandAccordionNestedjsx;

const $edecf56f7e85030c$var$SvgExpandWhitejsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 8,
    height: 4,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      d: "M.874 0C.097 0-.292.771.257 1.222L3.383 3.79c.341.28.893.28 1.234 0l3.126-2.568C8.293.772 7.903 0 7.126 0H.874Z",
      fill: "#fff",
    }),
  });
var $edecf56f7e85030c$export$2e2bcd8739ae039 = $edecf56f7e85030c$var$SvgExpandWhitejsx;

const $101dfe2381aa616c$var$SvgToggleDownjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 14,
    height: 14,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      d: "m7 13 6-6.6H1L7 13ZM12.454 1H1.545",
      stroke: "#272738",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  });
var $101dfe2381aa616c$export$2e2bcd8739ae039 = $101dfe2381aa616c$var$SvgToggleDownjsx;

const $0ae8e2514a1e1ed8$var$SvgToggleUpjsx = (props) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)("svg", {
    width: 14,
    height: 14,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    ...props,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("path", {
      d: "M7 1 1 7.6h12L7 1ZM1.546 13h10.909",
      stroke: "#272738",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
    }),
  });
var $0ae8e2514a1e1ed8$export$2e2bcd8739ae039 = $0ae8e2514a1e1ed8$var$SvgToggleUpjsx;

const $22dfeca7b2babd08$export$b0c3ddeace589b20 = (0, $26Zo0$styledcomponents)((0, $101dfe2381aa616c$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $22dfeca7b2babd08$export$2d689d9a9f573512 = (0, $26Zo0$styledcomponents)((0, $0ae8e2514a1e1ed8$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $22dfeca7b2babd08$export$f5cb197ef241297f = (0, $26Zo0$styledcomponents)((0, $bdf51a7dec640889$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $22dfeca7b2babd08$export$763b5fdab3e2c08b = (0, $26Zo0$styledcomponents)((0, $edecf56f7e85030c$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $22dfeca7b2babd08$export$67cd4f075b72ffc9 = (0, $26Zo0$styledcomponents)((0, $739f5af0c0f8f8ff$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $22dfeca7b2babd08$export$722f8bfc785472cf = (0, $26Zo0$styledcomponents)((0, $a1480bdc5bf254a2$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $22dfeca7b2babd08$export$fdbed76f4783dfe7 = (0, $26Zo0$styledcomponents)((0, $4fb3fcf3bdca47b8$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $22dfeca7b2babd08$export$7ac3ebb6edb0e044 = (0, $26Zo0$styledcomponents)((0, $aac0759694a6e12a$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $22dfeca7b2babd08$export$31901d6f7b9068da = (0, $26Zo0$styledcomponents)((0, $db5f028399063109$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;
const $22dfeca7b2babd08$export$ebe6507427cf15eb = (0, $26Zo0$styledcomponents)((0, $96c31682f66704ee$export$2e2bcd8739ae039))`
  ${(0, $71ea0fe27961e1ac$export$9d5e649303bff8ec)};
`;

const $ea6dcb9a76269852$export$3adaaf573ab8d282 = (0, $26Zo0$styledcomponents).div`
  display: flex;
  flex: 0 0 ${(props) => props.connectorWidth}px;
  gap: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px 4px;
`;
const $ea6dcb9a76269852$export$ecb8ece3e7bd8271 = (0, $26Zo0$styledcomponents).div`
  position: relative;
  line-height: 0;
  transition: top 0.2s ease-out, left 0.2s ease-out;
  display: ${(props) => (props.visible && props.visible === true ? "block" : "none")};

  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: revert;

  width: fit-content;
  height: fit-content;
  padding: 0;
  margin: 0;

  border: ${(props) => (props.isInside ? "1px solid red" : "")};

  .react-flow__handle-block {
    visibility: ${(props) => (props.visible ? "visible" : "hidden")};
    transition: top 0.2s ease-out, left 0.2s ease-out;
  }
`;

const $143b5d0d90345639$export$179bb831147717ca = (props) => {
  const { connectors: connectors, direction: direction, ...delegated } = props;
  const filteredConnectors = connectors?.filter((x) => x.direction === direction && !x.hidden);
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $ea6dcb9a76269852$export$3adaaf573ab8d282), {
    ...delegated,
    children:
      filteredConnectors &&
      filteredConnectors.map((x) => {
        if (x.hidden) return null;
        return /*#__PURE__*/ (0, $26Zo0$jsx)(
          $143b5d0d90345639$var$FlowHandleComponent,
          {
            handles: x.handles.filter((x) => !x.hidden),
            connectors: connectors,
            direction: direction,
            ...delegated,
          },
          `handle-${x.id}`
        );
      }),
  });
};
$143b5d0d90345639$export$179bb831147717ca.displayName = "FlowConnectorComponent";
$143b5d0d90345639$export$179bb831147717ca.defaultProps = {
  connectors: [],
  direction: (0, $b2b3ee50df44f9d6$export$69674d1480aba23d).Input,
  storybook: false,
  connectorWidth: 20,
  connectorHeight: 20,
};
/**
 * Handle part of a connector.
 * @param props Inherit props from parent component
 * @returns
 */ const $143b5d0d90345639$var$FlowHandleComponent = (props) => {
  const { handles: handles, connectorWidth: connectorWidth, connectorHeight: connectorHeight, storybook: storybook } = props;
  const calculateTopPosition = (handle, side) => {
    if (side === "inside" && handle.side === "outside") return "-24px";
    if (side === "outside" && handle.side === "inside") return "24px";
    return "0px";
  };
  // const calculateLeftPosition = (handle: FlowHandle, side: "inside" | "outside"): string => {
  //   switch (handle.position) {
  //     case Position.Left:
  //       return (connectorWidth != null ? connectorWidth * -1 - 5 : 0) + "px";
  //     case Position.Right:
  //       return (connectorWidth != null ? connectorWidth + 5 : 0) + "px";
  //     case Position.Bottom:
  //     case Position.Top:
  //       return "0px";
  //     default:
  //       return "0px";
  //   }
  // };
  // Sort the handle, inside always before outside
  // const sortHandles = (h: FlowHandle[] | undefined): FlowHandle[] => {
  //   if (h == null || h.length <= 0) return [];
  //   const inside = h.find((x) => x.side === "inside");
  //   const outside = h.find((x) => x.side === "outside");
  //   if (inside == null || outside == null)
  //     throw Error("A connector should have one inside handle and one outside handle");
  //   return [inside, outside];
  // };
  // const sorted = sortHandles(handles);
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$Fragment), {
    children: handles?.map((x) => {
      return /*#__PURE__*/ (0, $26Zo0$jsxs)(
        (0, $ea6dcb9a76269852$export$ecb8ece3e7bd8271),
        {
          id: `handle-${x.id}`,
          top: calculateTopPosition(x, props.side),
          left: "0px",
          visible: x.side === props.side,
          hidden: x.hidden,
          children: [
            /*#__PURE__*/ (0, $26Zo0$jsx)((0, $c3a4bc69ae9a6bdc$export$b853f99e0a417737), {
              style: {
                fill: x.color,
              },
              className: x.className,
              width: `${connectorWidth}px`,
              height: `${connectorHeight}px`,
            }),
            !storybook &&
              /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$Handle), {
                hidden: x.hidden,
                type: x.handleType,
                position: x.position,
                id: x.id,
                className: x.className,
              }),
          ],
        },
        x.id
      );
    }),
  });
};
$143b5d0d90345639$var$FlowHandleComponent.displayName = "FlowHandleComponent";
$143b5d0d90345639$var$FlowHandleComponent.defaultProps = {
  handles: [],
  storybook: false,
  connectorWidth: 20,
  connectorHeight: 20,
};

const $d2e4eb53d530e7c5$export$ac657ebdd1d0f1b9 = (0, $26Zo0$styledcomponents).img`
  max-height: 100%;
  pointer-events: none;
`;
const $d2e4eb53d530e7c5$export$236d96ef38f832f6 = (0, $26Zo0$styledcomponents).div`
  max-height: 30px;

  ${$d2e4eb53d530e7c5$export$ac657ebdd1d0f1b9} {
    min-height: 30px;
  }
`;
const $d2e4eb53d530e7c5$export$4a2034c9f860b7cd = (0, $26Zo0$styledcomponents).div`
  position: absolute;
  bottom: 0;
  height: 20px;
  width: 50px;
  align-self: flex-start;
  pointer-events: none;
  margin-left: 10px;

  img {
    min-height: 100%;
    filter: brightness(0%);
  }
`;

const $a0616ba83d24d848$export$3e25e887b7a5b37b = ({ source: source, text: text }) => {
  if (source == null) return null;
  if (source.startsWith("http"))
    return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $d2e4eb53d530e7c5$export$ac657ebdd1d0f1b9), {
      src: source,
      alt: text,
      draggable: "false",
    });
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $d2e4eb53d530e7c5$export$ac657ebdd1d0f1b9), {
    src: "data:image/svg+xml;base64," + source,
    alt: text,
    draggable: "false",
  });
};

/**
 * Function to ignore circular references
 */ const $26eef136237b9fb6$export$c4d25c0d0c3b7f = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (key.startsWith("_")) return;
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};
const $26eef136237b9fb6$export$7149c6ffc9994c32 = () => {
  let d = new Date().getTime();
  let d2 = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16;
    if (d > 0) {
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};
const $26eef136237b9fb6$export$bd1203ad2e3208f7 = (domain) => {
  const id = $26eef136237b9fb6$export$7149c6ffc9994c32();
  if (domain == null) return id;
  return domain + "_" + id;
};
const $26eef136237b9fb6$export$637515699a57839b = (id) => {
  if (id == null) throw Error("Can't find a domian from null or undefined string.");
  const split = id.split("_");
  if (split.length !== 2) throw Error("Can't find a domian. An id should be like example.com_xxxxx-xxxxx-xxxxx.");
  return split[0].trim();
};
const $26eef136237b9fb6$export$5a466c0ba959b06 = (value) => {
  return value.replace(/\/+$/, "");
};
const $26eef136237b9fb6$export$de3609038e2dcd26 = (negative = true) => {
  const input = $26eef136237b9fb6$export$7149c6ffc9994c32();
  let hash = 0;
  const len = input.length;
  for (let i = 0; i < len; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  if (negative && hash > 0) return hash * -1;
  else return hash;
};
const $26eef136237b9fb6$export$260733d43c3dc50a = (from, to) => {
  const f = $26eef136237b9fb6$export$5e4cc6abec75530(from);
  const t = $26eef136237b9fb6$export$5e4cc6abec75530(to);
  if (f == null || t == null) return 0;
  const backInTime = f > t;
  if (f.getDate() === t.getDate() && f.getMonth() === t.getMonth() && f.getFullYear() === t.getFullYear()) return 1;
  const difference_In_Time = Math.round(t.getTime() - f.getTime());
  return Number((difference_In_Time / 86400000).toFixed(0)) + (backInTime ? -1 : 1);
};
const $26eef136237b9fb6$export$5e4cc6abec75530 = (value) => {
  if (value == null) return undefined;
  if (typeof value === "string")
    try {
      return new Date(value);
    } catch (error) {
      console.warn("Can't parse date string: ", value);
      return new Date();
    }
  return value;
};
const $26eef136237b9fb6$export$71b45186df786da8 = (current, from, to) => {
  const c = $26eef136237b9fb6$export$5e4cc6abec75530(current);
  const f = $26eef136237b9fb6$export$5e4cc6abec75530(from);
  const t = $26eef136237b9fb6$export$5e4cc6abec75530(to);
  if (c == null || f == null || t == null) return false;
  c.setHours(0, 0, 0, 0);
  f.setHours(0, 0, 0, 0);
  t.setHours(0, 0, 0, 0);
  return c <= t && c >= f;
};

/**
 * Removes styles from react router links.
 * Useful when wrapping other elements with navigation semantics.
 */ const $8e605db25e465cc8$var$ResizablePanelContainer = (0, $26Zo0$styledcomponents).div`
  position: relative;
  overflow: ${(props) => (props.maxTrigger ? "auto" : "hidden")};
  ${(0, $4742fce91a36bc96$export$661888f3c6187e4c)};
`;
$8e605db25e465cc8$var$ResizablePanelContainer.defaultProps = {
  maxTrigger: false,
};
const $8e605db25e465cc8$export$72e21f73896cddc4 = (0, $26Zo0$motion)($8e605db25e465cc8$var$ResizablePanelContainer);

const $692dde140a8b09f1$export$2fb164ca5cfe7082 = ({ children: children, duration: duration, maxHeight: maxHeight }) => {
  const [ref, { height: height }] = (0, $26Zo0$reactusemeasure)();
  let h = height;
  let maxTrigger = false;
  if (maxHeight != null && h != null && height >= maxHeight) {
    h = maxHeight;
    maxTrigger = true;
  }
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $8e605db25e465cc8$export$72e21f73896cddc4), {
    animate: {
      height: h || "auto",
    },
    maxTrigger: maxTrigger,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$AnimatePresence), {
      initial: false,
      children: /*#__PURE__*/ (0, $26Zo0$jsx)(
        (0, $26Zo0$motion).div,
        {
          initial: {
            opacity: 0,
          },
          animate: {
            opacity: 1,
            transition: {
              duration: duration / 2,
              delay: duration / 2,
            },
          },
          exit: {
            opacity: 0,
            transition: {
              duration: duration / 2,
            },
          },
          children: /*#__PURE__*/ (0, $26Zo0$jsx)("div", {
            ref: ref,
            style: {
              position: "absolute",
            },
            children: children,
          }),
        },
        JSON.stringify(children, (0, $26eef136237b9fb6$export$c4d25c0d0c3b7f)())
      ),
    }),
  });
};

const $131d9058faf478d3$export$b252e133e2c7204f = (props) => {
  const { header: header, open: open, duration: duration, children: children, ...delegated } = props;
  const [expanded, setExpanded] = (0, $26Zo0$useState)(false);
  (0, $26Zo0$useEffect)(() => {
    setExpanded(open);
  }, [open]);
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$MotionConfig), {
    transition: {
      duration: duration,
    },
    children: /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $26Zo0$Fragment), {
      children: [
        header,
        /*#__PURE__*/ (0, $26Zo0$jsx)((0, $692dde140a8b09f1$export$2fb164ca5cfe7082), {
          duration: duration,
          ...delegated,
          children: expanded && children,
        }),
      ],
    }),
  });
};
$131d9058faf478d3$export$b252e133e2c7204f.displayName = "MotionPanel";

const $0a4fb0807d734a92$export$14892c202f726f14 = (0, $26Zo0$styledcomponents)((0, $26Zo0$Link))`
  color: inherit;
  text-decoration: inherit;

  :link,
  :hover {
    color: inherit;
    text-decoration: inherit;
  }

  ${(0, $34603d4f3a3fbd9a$export$e7171cddf5044e64)};
`;

const $b0a2f5db4ae850d7$export$a5e06607a5ac6158 = (0, $26Zo0$styledcomponents).div`
  margin: 0;
  padding: 0;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -100px;
  width: 50px;
  height: 50px;
`;
const $b0a2f5db4ae850d7$export$d499834a866f77c6 = (0, $26Zo0$styledcomponents).div`
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 901;
`;

const $8a61fa0583e81acb$export$7f7cbe89f1eacd2 = ({ variant: variant, disabled: disabled }) => {
  const theme = (0, $26Zo0$useTheme)();
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$Fragment), {
    children:
      !disabled &&
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $b0a2f5db4ae850d7$export$d499834a866f77c6), {
        children: /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $b0a2f5db4ae850d7$export$a5e06607a5ac6158), {
          children: [
            variant &&
              variant === "circle" &&
              /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$CircleLoader), {
                color: theme.mimir.color.primary.base,
              }),
            variant &&
              variant === "scale" &&
              /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$ScaleLoader), {
                color: theme.mimir.color.primary.base,
              }),
          ],
        }),
      }),
  });
};
$8a61fa0583e81acb$export$7f7cbe89f1eacd2.displayName = "Spinner";
$8a61fa0583e81acb$export$7f7cbe89f1eacd2.defaultValues = {
  variant: "circle",
  disabled: true,
};

const $21894e23ce5bb51f$export$a8a3e93435678ff9 = (0, $26Zo0$styledcomponents).h1`
  ${({ variant: variant }) => (0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)(variant)};
  ${(0, $4742fce91a36bc96$export$661888f3c6187e4c)};
  ${(0, $62135822dca75810$export$80711e28e77935d5)};
  ${(0, $dbede0d07a4a8764$export$f8eec27d1ad18090)};
  ${(0, $67c30f5a5f973bd7$export$66376f8025bd3245)};
  ${(0, $6c425cf1a0a27663$export$8f688f6a86c9adf3)};
  ${(0, $34603d4f3a3fbd9a$export$e7171cddf5044e64)};
`;
$21894e23ce5bb51f$export$a8a3e93435678ff9.displayName = "Heading";
$21894e23ce5bb51f$export$a8a3e93435678ff9.defaultProps = {
  useEllipsis: false,
  ellipsisMaxLines: 1,
};

const $93f040bab052c081$var$TooltipContent = (0, $26Zo0$styledcomponents).div`
  padding: ${(props) => props.theme.mimir.spacing.base} ${(props) => props.theme.mimir.spacing.l};
  border-radius: ${(props) => props.theme.mimir.border.radius.large};
  background-color: ${(props) => props.theme.mimir.color.surface.inverse.base};
  color: ${(props) => props.theme.mimir.color.surface.inverse.on};
  box-shadow: ${(props) => props.theme.mimir.shadow.small};
  ${(0, $34603d4f3a3fbd9a$export$e7171cddf5044e64)};
`;
const $93f040bab052c081$export$e70caaa407ca3f33 = (0, $26Zo0$motion)($93f040bab052c081$var$TooltipContent);

const $6e97fa5953c89edb$export$28c660c63b792dea = /*#__PURE__*/ (0, $26Zo0$forwardRef)((props, ref) => {
  const {
    children: children,
    content: content,
    placement: placement,
    align: align,
    delay: delay,
    offset: offset,
    asChild: asChild,
    ...delegated
  } = props;
  const theme = (0, $26Zo0$useTheme)();
  const containsTextOnly = typeof content === "string";
  return /*#__PURE__*/ (0, $26Zo0$jsx)("div", {
    ref: ref,
    children: /*#__PURE__*/ (0, $26Zo0$jsxs)($26Zo0$Root2, {
      disableHoverableContent: true,
      delayDuration: delay,
      children: [
        /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$Trigger, {
          asChild: asChild,
          children: children,
        }),
        /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$AnimatePresence), {
          children: /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$Portal, {
            children: /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$Content, {
              asChild: asChild,
              avoidCollisions: true,
              sideOffset: offset,
              side: placement,
              align: align,
              children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $93f040bab052c081$export$e70caaa407ca3f33), {
                ...theme.mimir.animation.scale,
                ...delegated,
                children: containsTextOnly
                  ? /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
                      variant: "body-medium",
                      children: content,
                    })
                  : content,
              }),
            }),
          }),
        }),
      ],
    }),
  });
});
$6e97fa5953c89edb$export$28c660c63b792dea.displayName = "Tooltip";
$6e97fa5953c89edb$export$28c660c63b792dea.defaultProps = {
  placement: "top",
  align: "center",
  delay: 0,
  offset: 8,
  asChild: true,
};

var $c139bef812a7be7c$exports = {};

$parcel$export($c139bef812a7be7c$exports, "SettingProvider", () => $55921be34448eae0$export$6f0dace02a814e88);
$parcel$export($c139bef812a7be7c$exports, "useSetting", () => $a39d7373180be33b$export$12b0e20ae7d96a25);
$parcel$export($c139bef812a7be7c$exports, "useLocalStorage", () => $94354bf9bddb77d8$export$86e2cef2561044ac);
$parcel$export($c139bef812a7be7c$exports, "useMimirorgTheme", () => $df0176613785fe08$export$74446bd855170621);

const $fda42a1c52d4fcbb$export$3054a16eb4fe8c9e = /*#__PURE__*/ (0, $26Zo0$createContext)({});

const $55921be34448eae0$var$defaultAppSetting = {
  language: {
    current: "en",
    languages: [
      {
        code: "no",
        name: "Norwegian",
      },
      {
        code: "en",
        name: "English",
      },
    ],
  },
};
const $55921be34448eae0$export$6f0dace02a814e88 = ({ children: children }) => {
  const [setting, setSetting] = (0, $26Zo0$useState)(() => {
    if (typeof window === "undefined") return $55921be34448eae0$var$defaultAppSetting;
    try {
      const item = window.localStorage.getItem("appsetting");
      return item ? JSON.parse(item) : $55921be34448eae0$var$defaultAppSetting;
    } catch (error) {
      console.warn(error);
      return $55921be34448eae0$var$defaultAppSetting;
    }
  });
  (0, $26Zo0$useEffect)(() => {
    window.localStorage.setItem("appsetting", JSON.stringify(setting));
  }, [setting]);
  const settingProviderValue = (0, $26Zo0$useMemo)(
    () => ({
      setting: setting,
      setSetting: setSetting,
    }),
    [setting, setSetting]
  );
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $fda42a1c52d4fcbb$export$3054a16eb4fe8c9e).Provider, {
    value: settingProviderValue,
    children: children,
  });
};

const $a39d7373180be33b$export$12b0e20ae7d96a25 = () => {
  return (0, $26Zo0$useContext)((0, $fda42a1c52d4fcbb$export$3054a16eb4fe8c9e));
};

function $94354bf9bddb77d8$export$86e2cef2561044ac(key, initialValue) {
  const [storedValue, setStoredValue] = (0, $26Zo0$useState)(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(error);
    }
  };
  return [storedValue, setValue];
}

const $df0176613785fe08$export$74446bd855170621 = () => {
  const theme = (0, $26Zo0$useTheme)();
  return theme.mimir;
};

var $b5c4260ed4ee85a9$exports = {};

var $a60eebdafdf9fd50$exports = {};

$parcel$export($a60eebdafdf9fd50$exports, "calculateDays", () => $26eef136237b9fb6$export$260733d43c3dc50a);
$parcel$export($a60eebdafdf9fd50$exports, "createDomainId", () => $26eef136237b9fb6$export$bd1203ad2e3208f7);
$parcel$export($a60eebdafdf9fd50$exports, "createId", () => $26eef136237b9fb6$export$7149c6ffc9994c32);
$parcel$export($a60eebdafdf9fd50$exports, "createNumberId", () => $26eef136237b9fb6$export$de3609038e2dcd26);
$parcel$export($a60eebdafdf9fd50$exports, "forceDate", () => $26eef136237b9fb6$export$5e4cc6abec75530);
$parcel$export($a60eebdafdf9fd50$exports, "getDomainFromId", () => $26eef136237b9fb6$export$637515699a57839b);
$parcel$export($a60eebdafdf9fd50$exports, "ignoreCircularReferences", () => $26eef136237b9fb6$export$c4d25c0d0c3b7f);
$parcel$export($a60eebdafdf9fd50$exports, "isdateBetween", () => $26eef136237b9fb6$export$71b45186df786da8);
$parcel$export($a60eebdafdf9fd50$exports, "removeTrailingSlashes", () => $26eef136237b9fb6$export$5a466c0ba959b06);
$parcel$export($a60eebdafdf9fd50$exports, "toBase64", () => $1c87128f875a591e$export$37cc283d8fbd3462);
$parcel$export($a60eebdafdf9fd50$exports, "lsReadValue", () => $7bd8ff234e9a7c36$export$81e76f652c2aead0);
$parcel$export($a60eebdafdf9fd50$exports, "lsSaveValue", () => $7bd8ff234e9a7c36$export$98bd917067ba65d5);

const $1c87128f875a591e$export$37cc283d8fbd3462 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const $1c87128f875a591e$export$b20f4ee19ffa0668 = (base64) => {
  // Split into two parts
  const parts = base64.split(";base64,");
  // Hold the content type
  const imageType = parts[0].split(":")[1];
  // Decode Base64 string
  const decodedData = (0, $26Zo0$decode)(parts[1]);
  // Create UNIT8ARRAY of size same as row data length
  const uInt8Array = new Uint8Array(decodedData.length);
  // Insert all character code into uInt8Array
  for (let i = 0; i < decodedData.length; ++i) uInt8Array[i] = decodedData.charCodeAt(i);
  // Return BLOB image after conversion
  return new Blob([uInt8Array], {
    type: imageType,
  });
};

/**
 * Read value from local storage
 * The data must be stored in json format.
 * If error it returns null and logs a warning to the console.
 *
 * @param key  the storage key
 */ function $7bd8ff234e9a7c36$export$81e76f652c2aead0(key) {
  if (typeof window === "undefined") return null;
  try {
    const item = window.localStorage.getItem(key);
    if (item == null) return null;
    return JSON.parse(item);
  } catch (error) {
    console.warn(error);
  }
  return null;
}
function $7bd8ff234e9a7c36$export$98bd917067ba65d5(key, value) {
  if (typeof window === "undefined") return;
  try {
    if (value == null) {
      window.localStorage.removeItem(key);
      return;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(error);
  }
}

var $20ad44a5ad0a982d$exports = {};

$parcel$export($20ad44a5ad0a982d$exports, "MimirorgThemeProvider", () => $b58947f94f33ca4a$export$613dacf2c09c65aa);

const $cdac57a3491c6a34$export$5d16871b54b7e5b4 = (theme) => ({
  style: {
    display: "flex",
    padding: `${theme.spacing.base} ${theme.spacing.l}`,
    boxShadow: theme.shadow.small,
    borderRadius: theme.border.radius.medium,
    font: theme.typography.roles.label.large.font,
    letterSpacing: theme.typography.roles.label.large.letterSpacing,
    lineHeight: theme.typography.roles.label.large.lineHeight,
    background: theme.color.secondary.base,
    color: theme.color.secondary.on,
  },
  success: {
    icon: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$CheckCircle), {
      size: 24,
      style: {
        flexShrink: 0,
      },
    }),
    style: {
      background: theme.color.success.base,
      color: theme.color.success.on,
    },
  },
  error: {
    icon: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$XCircle), {
      size: 24,
      style: {
        flexShrink: 0,
      },
    }),
    style: {
      background: theme.color.error.base,
      color: theme.color.error.on,
    },
  },
});
const $cdac57a3491c6a34$export$c4a82530b31b3f8e = () => ({
  animation: "revert",
});

const $4ffe7ebd19297b7f$export$cfd585d01b202eca = (0, $26Zo0$motion).div;

const $45a7d0798d6b2474$export$fb98e3a2a4cd92d7 = () => {
  const theme = (0, $26Zo0$useTheme)();
  const customToasterStyles = (0, $cdac57a3491c6a34$export$5d16871b54b7e5b4)(theme.mimir);
  const customToastBarStyles = (0, $cdac57a3491c6a34$export$c4a82530b31b3f8e)();
  return /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$Toaster, {
    position: "bottom-right",
    toastOptions: customToasterStyles,
    children: (toast) =>
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$AnimatePresence), {
        children:
          toast.visible &&
          /*#__PURE__*/ (0, $26Zo0$jsx)((0, $4ffe7ebd19297b7f$export$cfd585d01b202eca), {
            ...theme.mimir.animation.from("right", 400),
            children: /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$ToastBar, {
              toast: toast,
              style: customToastBarStyles,
            }),
          }),
      }),
  });
};

const $a0cf595f899d435b$export$ee6441f5fa13d80 = (0, $26Zo0$css)`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html,
  body {
    height: 100%;
    margin: 0;
  }

  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  #root {
    isolation: isolate;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const $a0e22bec0d1eec3f$export$f05794e648629f6c = (0, $26Zo0$createGlobalStyle)`
  ${(0, $a0cf595f899d435b$export$ee6441f5fa13d80)};

  body {
    background: ${({ theme: theme }) => theme.mimir.color.background.base};
  }

  // Global typography styles
  body {
    font-family: ${({ theme: theme }) => theme.mimir.typography.typeface.brand};
    font-weight: ${({ theme: theme }) => theme.mimir.typography.typeface.weights.normal};
    font-size: 100%;
    color: ${({ theme: theme }) => theme.mimir.color.text.base};
  }

  h1 {
    ${(0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)("display-large")};
  }

  h2 {
    ${(0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)("display-medium")};
  }

  h3 {
    ${(0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)("display-small")};
  }

  h4 {
    ${(0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)("headline-large")};
  }

  h5 {
    ${(0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)("headline-medium")};
  }

  h6 {
    ${(0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)("headline-small")};
  }

  p,
  a {
    ${(0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)("body-large")};
  }

  a:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  b,
  strong {
    ${(0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)("body-large")};
    font-weight: ${({ theme: theme }) => theme.mimir.typography.typeface.weights.bold};
  }

  small {
    ${(0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)("body-small")};
  }

  ::-webkit-scrollbar {
    width: 14px;
    height: 18px;
  }

  ::-webkit-scrollbar-thumb {
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    border-radius: 7px;
    background-color: #C4C4C4;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

function $81f5dbfa378fc5ca$export$b325a9f6dade91bd(initial) {
  const [colorTheme, setColorTheme] = (0, $26Zo0$useState)(initial);
  (0, $26Zo0$useEffect)(() => {
    function setPreferredTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme && ["dark", "light"].includes(savedTheme)) setColorTheme(savedTheme);
    }
    setPreferredTheme();
    window.addEventListener("storage", setPreferredTheme);
    return () => window.removeEventListener("storage", setPreferredTheme);
  }, []);
  return [colorTheme];
}

const $b58947f94f33ca4a$export$613dacf2c09c65aa = ({ theme: theme = "light", children: children }) => {
  const [colorTheme] = (0, $81f5dbfa378fc5ca$export$b325a9f6dade91bd)(theme);
  const applicationTheme = {
    mimir: (0, $529f04d5337d454b$export$8c5e244d866eaf89)(colorTheme),
  };
  return /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $26Zo0$ThemeProvider), {
    theme: applicationTheme,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $a0e22bec0d1eec3f$export$f05794e648629f6c), {}),
      /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $26Zo0$MotionConfig), {
        reducedMotion: "user",
        children: [
          /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$TooltipProvider), {
            children: children,
          }),
          /*#__PURE__*/ (0, $26Zo0$jsx)((0, $45a7d0798d6b2474$export$fb98e3a2a4cd92d7), {}),
        ],
      }),
    ],
  });
};

var $e971fdaa7da65bdd$exports = {};

$parcel$export($e971fdaa7da65bdd$exports, "Box", () => $da441300bfed1ab2$export$e71c4d32a2263218);
$parcel$export($e971fdaa7da65bdd$exports, "MotionBox", () => $da441300bfed1ab2$export$9dfcb7da7cf3aa86);
$parcel$export($e971fdaa7da65bdd$exports, "Flexbox", () => $6e27437643813539$export$5fceefdeba78d15a);
$parcel$export($e971fdaa7da65bdd$exports, "MotionFlexbox", () => $6e27437643813539$export$21b95509b28a7683);
$parcel$export($e971fdaa7da65bdd$exports, "Gridbox", () => $717b690a15449498$export$926bf97b2b58e3ae);
$parcel$export($e971fdaa7da65bdd$exports, "MotionGridbox", () => $717b690a15449498$export$a4d1ee21f95f7fcb);

const $da441300bfed1ab2$export$e71c4d32a2263218 = (0, $26Zo0$styledcomponents).div`
  ${(0, $67df19b86caf10c5$export$d7ddd398f22d79ef)};
  ${(0, $dbede0d07a4a8764$export$f8eec27d1ad18090)};
  ${(0, $cc3087a9fdba245d$export$4f72868321d0b640)};
  ${(0, $a5ec92789176ef4c$export$166ec73ef8a2b529)};
  ${(0, $0c9d7cacb3e1505a$export$8eca5bbbbc0c7f55)};
  ${(0, $34603d4f3a3fbd9a$export$e7171cddf5044e64)};
  ${(0, $0288e2eadd55a419$export$d3b29362ee011466)};
  ${(0, $62135822dca75810$export$80711e28e77935d5)};
  ${(0, $9c83c1f11f79e0d1$export$5cc25c17b25332b0)};
  ${(0, $4742fce91a36bc96$export$661888f3c6187e4c)};
`;
const $da441300bfed1ab2$export$9dfcb7da7cf3aa86 = (0, $26Zo0$motion)($da441300bfed1ab2$export$e71c4d32a2263218);

const $6e27437643813539$export$5fceefdeba78d15a = (0, $26Zo0$styledcomponents).div`
  display: flex;
  ${(0, $67df19b86caf10c5$export$d7ddd398f22d79ef)};
  ${(0, $cc3087a9fdba245d$export$4f72868321d0b640)};
`;
const $6e27437643813539$export$21b95509b28a7683 = (0, $26Zo0$motion)($6e27437643813539$export$5fceefdeba78d15a);

const $717b690a15449498$export$926bf97b2b58e3ae = (0, $26Zo0$styledcomponents).div`
  display: grid;
  ${(0, $a5ec92789176ef4c$export$166ec73ef8a2b529)};
`;
const $717b690a15449498$export$a4d1ee21f95f7fcb = (0, $26Zo0$motion)($717b690a15449498$export$926bf97b2b58e3ae);

var $5160ac8749fc8fc4$exports = {};

$parcel$export($5160ac8749fc8fc4$exports, "Dialog", () => $e61374bbfe072911$export$3ddf2d174ce01153);
$parcel$export($5160ac8749fc8fc4$exports, "DialogDescription", () => $ca4291856ca5ea28$export$94e94c2ec2c954d5);
$parcel$export($5160ac8749fc8fc4$exports, "DialogExit", () => $f0b76ef41432877d$export$57907242f1c228d4);
$parcel$export($5160ac8749fc8fc4$exports, "DialogTitle", () => $48478f5908e23f0a$export$16f7638e4a34b909);
$parcel$export($5160ac8749fc8fc4$exports, "FileComponent", () => $a9c06df81cd28ab5$export$69f33c96a751ad5e);
$parcel$export($5160ac8749fc8fc4$exports, "Form", () => $dbff3f1a6d6560d4$export$a7fed597f4b8afd8);
$parcel$export($5160ac8749fc8fc4$exports, "FormErrorBanner", () => $d259bdd2e0b678d6$export$48e635acc81ce1d);
$parcel$export($5160ac8749fc8fc4$exports, "FormField", () => $952d306367811240$export$56e87bf42978147a);
$parcel$export($5160ac8749fc8fc4$exports, "FormFieldset", () => $6ac48fb302788f2d$export$9dbe89f9a87918c);
$parcel$export($5160ac8749fc8fc4$exports, "FormHeader", () => $689b170d0b2af587$export$97ee2cbf37e5ebfe);
$parcel$export($5160ac8749fc8fc4$exports, "FormLegend", () => $6a8a770e23835f0b$export$39c7ec7ed1888ce3);
$parcel$export($5160ac8749fc8fc4$exports, "CalendarComponent", () => $e03d31f9582382bc$export$b7ed69a880252dd);
$parcel$export($5160ac8749fc8fc4$exports, "Checkbox", () => $5820a23f7bab0dfc$export$48513f6b9f8ce62d);
$parcel$export($5160ac8749fc8fc4$exports, "Input", () => $a759f6a6082fb50d$export$f5b8910cec6cf069);
$parcel$export($5160ac8749fc8fc4$exports, "RadioButton", () => $065a64e6eba0c5b6$export$f4422ae58352e179);
$parcel$export($5160ac8749fc8fc4$exports, "RichTextarea", () => $7e3cea35ade5a03c$export$988f442bad83a3dc);
$parcel$export($5160ac8749fc8fc4$exports, "Select", () => $1f15799bbf16fbf3$export$ef9b1a59e592288f);
$parcel$export($5160ac8749fc8fc4$exports, "Textarea", () => $2223269a322e756a$export$379139ebc1c2b235);
$parcel$export($5160ac8749fc8fc4$exports, "UserAutoComplete", () => $0e8b50cb9746e0c1$export$dd2805e091597ff2);
$parcel$export($5160ac8749fc8fc4$exports, "SwitchComponent", () => $be5aab2b1cf71957$export$4f67f25efd2613a8);
$parcel$export($5160ac8749fc8fc4$exports, "Popover", () => $a42bded32577d99a$export$5b6b19405a83ff9d);
$parcel$export($5160ac8749fc8fc4$exports, "toast", () => $95064cb24a90d97c$export$b410431fab84fa58);
$parcel$export($5160ac8749fc8fc4$exports, "FlowNodeComponent", () => $83f8c16986f12dec$export$ec1602e46eacee2c);

const $ca4291856ca5ea28$export$94e94c2ec2c954d5 = ({ children: children, hide: hide }) => {
  const theme = (0, $26Zo0$useTheme)();
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $ab754ee3829129c7$export$39aecc95f0365819), {
    condition: hide,
    wrapper: (c) =>
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $066b48d8e5b33e52$export$439d29a4e110a164), {
        asChild: true,
        children: c,
      }),
    children: /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$Description, {
      asChild: true,
      children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
        variant: "title-medium",
        textAlign: "center",
        color: theme.mimir.color.surface.on,
        children: children,
      }),
    }),
  });
};

const $f0b76ef41432877d$export$57907242f1c228d4 = ({ closeText: closeText }) => {
  const theme = (0, $26Zo0$useTheme)();
  return /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$Close, {
    asChild: true,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $da441300bfed1ab2$export$e71c4d32a2263218), {
      position: "absolute",
      top: theme.mimir.spacing.xl,
      right: theme.mimir.spacing.xl,
      children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $696f693fac81a609$export$353f5b6fc5456de1), {
        width: "25px",
        height: "25px",
        variant: "text",
        icon: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$Close1), {}),
        iconOnly: true,
        children: closeText ?? "Close dialog",
      }),
    }),
  });
};

const $48478f5908e23f0a$export$16f7638e4a34b909 = ({ children: children, hide: hide }) =>
  /*#__PURE__*/ (0, $26Zo0$jsx)((0, $ab754ee3829129c7$export$39aecc95f0365819), {
    condition: hide,
    wrapper: (c) =>
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $066b48d8e5b33e52$export$439d29a4e110a164), {
        asChild: true,
        children: c,
      }),
    children: /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$Title, {
      asChild: true,
      children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
        variant: "title-large",
        textAlign: "center",
        children: children,
      }),
    }),
  });

const $315b786ed5c0b8fc$export$b6d9565de1e068cf = (0, $26Zo0$styledcomponents)((0, $da441300bfed1ab2$export$e71c4d32a2263218))`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.mimir.spacing.xxxl};

  background-color: ${(props) => props.theme.mimir.color.surface.base};
  border-radius: ${(props) => props.theme.mimir.border.radius.large};

  min-height: 380px;
  padding: ${(props) => props.theme.mimir.spacing.multiple(6)};

  box-shadow: ${(props) => props.theme.mimir.shadow.small};

  ${(0, $34603d4f3a3fbd9a$export$e7171cddf5044e64)};
  ${(0, $cc3087a9fdba245d$export$4f72868321d0b640)};
`;
const $315b786ed5c0b8fc$export$bd1d06c79be19e17 = (0, $26Zo0$styledcomponents)((0, $26Zo0$motion).div)`
  position: fixed;
  inset: 0;
  background-color: ${(props) => (0, $b7d68aaa13a893fa$export$107ddc37a9b1adef)(props.theme.mimir.color.primary.base, 0.08)};
`;

const $e61374bbfe072911$export$3ddf2d174ce01153 = /*#__PURE__*/ (0, $26Zo0$forwardRef)(
  (
    {
      children: children,
      content: content,
      open: open,
      onOpenChange: onOpenChange,
      title: title,
      hideTitle: hideTitle,
      description: description,
      hideDescription: hideDescription,
      closeText: closeText,
      ...delegated
    },
    ref
  ) => {
    const theme = (0, $26Zo0$useTheme)();
    return /*#__PURE__*/ (0, $26Zo0$jsxs)($26Zo0$Root3, {
      open: open,
      onOpenChange: onOpenChange,
      children: [
        /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$Trigger1, {
          asChild: true,
          ref: ref,
          children: children,
        }),
        /*#__PURE__*/ (0, $26Zo0$jsxs)($26Zo0$Portal1, {
          children: [
            /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$Overlay, {
              asChild: true,
              children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $315b786ed5c0b8fc$export$bd1d06c79be19e17), {
                ...theme.mimir.animation.fade,
              }),
            }),
            /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$Content1, {
              asChild: true,
              children: /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $315b786ed5c0b8fc$export$b6d9565de1e068cf), {
                ...theme.mimir.animation.fade,
                ...delegated,
                children: [
                  /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $da441300bfed1ab2$export$e71c4d32a2263218), {
                    display: "flex",
                    flexDirection: "column",
                    gap: theme.mimir.spacing.xl,
                    maxWidth: "50ch",
                    children: [
                      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $48478f5908e23f0a$export$16f7638e4a34b909), {
                        hide: hideTitle,
                        children: title,
                      }),
                      description &&
                        /*#__PURE__*/ (0, $26Zo0$jsx)((0, $ca4291856ca5ea28$export$94e94c2ec2c954d5), {
                          hide: hideDescription,
                          children: description,
                        }),
                    ],
                  }),
                  content,
                  /*#__PURE__*/ (0, $26Zo0$jsx)((0, $f0b76ef41432877d$export$57907242f1c228d4), {
                    closeText: closeText,
                  }),
                ],
              }),
            }),
          ],
        }),
      ],
    });
  }
);
$e61374bbfe072911$export$3ddf2d174ce01153.displayName = "Dialog";
$e61374bbfe072911$export$3ddf2d174ce01153.defaultProps = {};

const $2ed9e9b154965d6e$export$27eed098c9874905 = (event, files, setFiles) => {
  event.stopPropagation();
  event.preventDefault();
  const inputFiles = event.currentTarget.files;
  if (inputFiles == null) return;
  const addedFiles = Array.from(inputFiles);
  const filesToBeAdded = [];
  addedFiles.forEach(async (file) => {
    const bytes = await (0, $1c87128f875a591e$export$37cc283d8fbd3462)(file);
    const newFile = {
      id: (0, $26eef136237b9fb6$export$de3609038e2dcd26)(),
      fileName: file.name,
      fileSize: file.size,
      file: bytes != null ? bytes.toString() : null,
      contentType: file.type,
      description: "",
    };
    filesToBeAdded.push(newFile);
    const list = [...files, ...filesToBeAdded];
    setFiles(list);
  });
};
const $2ed9e9b154965d6e$export$a15a3028a90905c4 = (id, files, setFiles) => {
  const copy = files.filter((f) => f.id !== id);
  setFiles([...copy]);
};
const $2ed9e9b154965d6e$export$90f6aef435e99229 = (file) => {
  console.log(file);
  if (file?.file == null) return;
  const blob = (0, $1c87128f875a591e$export$b20f4ee19ffa0668)(file.file);
  const url = window.URL.createObjectURL(blob);
  window.open(url, "_blank");
};
const $2ed9e9b154965d6e$export$b51044f0614f06af = (id, description, files, setFiles) => {
  setFiles(
    files.map((x) => {
      if (x.id === id)
        return {
          ...x,
          description: description,
        };
      else return x;
    })
  );
};

const $4c423f69bee65878$export$6448bb74c7165a9b = (0, $26Zo0$styledcomponents).div``;
$4c423f69bee65878$export$6448bb74c7165a9b.defaultProps = {};

const $02339e43904fd62d$export$26f962dd216d8323 = (0, $26Zo0$styledcomponents).div``;
$02339e43904fd62d$export$26f962dd216d8323.defaultProps = {};

const $2223269a322e756a$export$379139ebc1c2b235 = (0, $26Zo0$styledcomponents).textarea`
  border: 1px solid ${(props) => props.theme.mimir.color.outline.base};
  border-radius: ${(props) => props.theme.mimir.border.radius.medium};
  min-height: 150px;
  width: 100%;
  padding: ${(props) => props.theme.mimir.spacing.base};
  color: ${(props) => props.theme.mimir.color.text.base};

  background-color: ${(props) => props.theme.mimir.color.pure.base};
  color: ${(props) => props.theme.mimir.color.background.on};

  :disabled {
    color: ${(props) => props.theme.mimir.color.surface.variant.on};
    background-color: ${(props) => props.theme.mimir.color.outline.base};
  }

  ${(0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)("body-large")};
  ${(0, $67df19b86caf10c5$export$d7ddd398f22d79ef)};
  ${(0, $70cc044a2d668431$export$c7187bbd1a7a9244)};
  ${(0, $34603d4f3a3fbd9a$export$e7171cddf5044e64)};
`;

const $c815cdfbef891f06$export$25c4d3453df90cbc = (0, $26Zo0$styledcomponents).div`
  display: flex;
  align-content: left;
  align-items: center;
  flex-direction: row;

  textarea {
    min-height: 80px;
  }

  & .fileitem-delete {
    :hover {
      cursor: pointer;
      border: 2px solid black;
      border-radius: 50%;
    }
  }

  @media screen and ${(props) => props.theme.mimir.queries.phoneAndBelow} {
    flex-direction: column;

    textarea {
      width: 100%;
    }
  }
`;
const $c815cdfbef891f06$export$c8979b2bd5481490 = (0, $26Zo0$styledcomponents).div`
  display: flex;
  width: 30%;
  align-content: center;
  align-items: center;
  justify-content: start;
  flex-direction: row;
  margin-right: ${(props) => props.theme.mimir.spacing.xl};
  padding-left: ${(props) => props.theme.mimir.spacing.s};
  padding-right: ${(props) => props.theme.mimir.spacing.s};

  :hover {
    outline: 1px solid ${(props) => props.theme.mimir.color.primary.base};
    cursor: pointer;
  }

  @media screen and ${(props) => props.theme.mimir.queries.phoneAndBelow} {
    margin-top: ${(props) => props.theme.mimir.spacing.xl};
    margin-bottom: ${(props) => props.theme.mimir.spacing.xl};
    width: 100%;
  }
`;
const $c815cdfbef891f06$export$3f4dbcdffceeb2ed = (0, $26Zo0$styledcomponents).div`
  display: flex;
  min-width: 50px;

  @media screen and ${(props) => props.theme.mimir.queries.phoneAndBelow} {
  }
`;
const $c815cdfbef891f06$export$93081c2c382f5a5c = (0, $26Zo0$styledcomponents).div`
  width: 70%;

  @media screen and ${(props) => props.theme.mimir.queries.phoneAndBelow} {
    width: 100%;
  }
`;
const $c815cdfbef891f06$export$132ef8b356046025 = (0, $26Zo0$styledcomponents).div`
  display: flex;
  flex-direction: column;
  max-width: 150px;
  margin-left: ${(props) => props.theme.mimir.spacing.l};
  margin-right: ${(props) => props.theme.mimir.spacing.l};

  @media screen and ${(props) => props.theme.mimir.queries.phoneAndBelow} {
    max-width: none;
    width: 70%;

    h4,
    p {
      margin: 0px;
    }
  }
`;
$c815cdfbef891f06$export$25c4d3453df90cbc.defaultProps = {};

const $c7dda0d0d5da014a$export$ce3a076f457f181f = ({
  fileInfo: fileInfo,
  onRemove: onRemove,
  onClick: onClick,
  onDescriptionChange: onDescriptionChange,
  placeholder: placeholder,
  tooltip: tooltip,
  disabled: disabled,
}) => {
  const onFileClick = () => {
    if (onClick != null) onClick(fileInfo);
  };
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$Fragment), {
    children:
      fileInfo != null &&
      /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $c815cdfbef891f06$export$25c4d3453df90cbc), {
        children: [
          /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $c815cdfbef891f06$export$c8979b2bd5481490), {
            onClick: onFileClick,
            children: [
              /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $c815cdfbef891f06$export$3f4dbcdffceeb2ed), {
                children: [
                  /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$Description1), {
                    size: 24,
                  }),
                  /*#__PURE__*/ (0, $26Zo0$jsx)((0, $6e97fa5953c89edb$export$28c660c63b792dea), {
                    content: tooltip ?? "Remove file",
                    children:
                      disabled === false &&
                      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$Clear), {
                        className: "fileitem-delete",
                        size: 16,
                        color: "red",
                        onClick: (e) => {
                          e.stopPropagation();
                          onRemove(fileInfo.id);
                        },
                      }),
                  }),
                ],
              }),
              /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $c815cdfbef891f06$export$132ef8b356046025), {
                children: [
                  /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
                    as: "p",
                    useEllipsis: true,
                    children: fileInfo.fileName,
                  }),
                  /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
                    variant: "label-medium",
                    children: [fileInfo.fileSize, " byte"],
                  }),
                ],
              }),
            ],
          }),
          /*#__PURE__*/ (0, $26Zo0$jsx)((0, $c815cdfbef891f06$export$93081c2c382f5a5c), {
            children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $2223269a322e756a$export$379139ebc1c2b235), {
              placeholder: placeholder ?? "Enter a file description here",
              onChange: (data) => onDescriptionChange(fileInfo.id, data.target.value),
              value: fileInfo.description,
              disabled: disabled,
            }),
          }),
        ],
      }),
  });
};

const $a9c06df81cd28ab5$export$69f33c96a751ad5e = /*#__PURE__*/ (0, $26Zo0$forwardRef)((props, ref) => {
  const {
    value: value,
    onChange: onChange,
    placeholder: placeholder,
    tooltip: tooltip,
    buttonText: buttonText,
    disabled: disabled,
  } = props;
  const theme = (0, $26Zo0$useTheme)();
  const inputFile = (0, $26Zo0$useRef)(null);
  const [files, setFiles] = (0, $26Zo0$useState)(value);
  (0, $26Zo0$useEffect)(() => {
    if (onChange != null) onChange(files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);
  return /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $4c423f69bee65878$export$6448bb74c7165a9b), {
    ref: ref,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $02339e43904fd62d$export$26f962dd216d8323), {
        children: [
          /*#__PURE__*/ (0, $26Zo0$jsx)("input", {
            type: "file",
            onChange: (e) => (0, $2ed9e9b154965d6e$export$27eed098c9874905)(e, files, setFiles),
            multiple: true,
            ref: inputFile,
            style: {
              display: "none",
            },
          }),
          /*#__PURE__*/ (0, $26Zo0$jsx)((0, $696f693fac81a609$export$353f5b6fc5456de1), {
            icon: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$Attachment), {
              size: 24,
            }),
            onClick: () => inputFile?.current?.click(),
            spacing: {
              pl: theme.mimir.spacing.l,
              pr: theme.mimir.spacing.l,
            },
            disabled: disabled,
            children: buttonText,
          }),
        ],
      }),
      files &&
        files.map((info, index) => {
          return /*#__PURE__*/ (0, $26Zo0$jsx)(
            "div",
            {
              children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $c7dda0d0d5da014a$export$ce3a076f457f181f), {
                fileInfo: info,
                onRemove: (id) => (0, $2ed9e9b154965d6e$export$a15a3028a90905c4)(id, files, setFiles),
                onClick: (file) => (0, $2ed9e9b154965d6e$export$90f6aef435e99229)(file),
                onDescriptionChange: (id, description) =>
                  (0, $2ed9e9b154965d6e$export$b51044f0614f06af)(id, description, files, setFiles),
                placeholder: placeholder,
                tooltip: tooltip,
                disabled: disabled,
              }),
            },
            index
          );
        }),
    ],
  });
});
$a9c06df81cd28ab5$export$69f33c96a751ad5e.displayName = "FileComponent";
$a9c06df81cd28ab5$export$69f33c96a751ad5e.defaultProps = {
  placeholder: "Enter file description here...",
  tooltip: "Add file",
  buttonText: "Add file",
  disabled: false,
};

const $dbff3f1a6d6560d4$export$a7fed597f4b8afd8 = (0, $26Zo0$styledcomponents).form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${(props) => props.theme.mimir.spacing.xxxl};
  width: 100%;

  ${(0, $cc3087a9fdba245d$export$4f72868321d0b640)};
`;

const $d259bdd2e0b678d6$export$48e635acc81ce1d = ({ children: children }) => {
  const theme = (0, $26Zo0$useTheme)();
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $da441300bfed1ab2$export$e71c4d32a2263218), {
    ...theme.mimir.animation.fade,
    spacing: {
      p: theme.mimir.spacing.l,
    },
    bgColor: theme.mimir.color.error.on,
    color: theme.mimir.color.error.base,
    children: children,
  });
};

const $568e7f719509e6ca$export$d07e27bccbb3ba3e = (0, $26Zo0$styledcomponents).span`
  ${({ variant: variant }) => (0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)(variant)}
  color: ${(props) => props.theme.mimir.color.text.base};
  padding-left: ${(props) => props.indent && props.theme.mimir.spacing.l};
  border-left: ${(props) => props.indent && "1px solid transparent"};
`;

const $952d306367811240$export$56e87bf42978147a = ({ label: label, error: error, indent: indent = true, children: children }) => {
  const theme = (0, $26Zo0$useTheme)();
  const hasLabel = !!label?.length;
  return /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $6e27437643813539$export$5fceefdeba78d15a), {
    flexDirection: "column",
    gap: theme.mimir.spacing.s,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $6e27437643813539$export$5fceefdeba78d15a), {
        as: hasLabel ? "label" : "div",
        flexDirection: "column",
        gap: theme.mimir.spacing.xs,
        children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $ab754ee3829129c7$export$39aecc95f0365819), {
          condition: hasLabel,
          wrapper: (c) =>
            /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $26Zo0$Fragment), {
              children: [
                /*#__PURE__*/ (0, $26Zo0$jsx)((0, $568e7f719509e6ca$export$d07e27bccbb3ba3e), {
                  indent: indent,
                  variant: "label-medium",
                  children: label,
                }),
                c,
              ],
            }),
          children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$Fragment), {
            children: children,
          }),
        }),
      }),
      error &&
        error.message &&
        /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $6e27437643813539$export$5fceefdeba78d15a), {
          alignItems: "center",
          gap: theme.mimir.spacing.s,
          ...theme.mimir.animation.fade,
          children: [
            /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$ExclamationCircle), {
              size: "14px",
              color: theme.mimir.color.error.base,
            }),
            /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
              variant: "label-medium",
              color: theme.mimir.color.error.base,
              children: error.message,
            }),
          ],
        }),
    ],
  });
};

const $6ac48fb302788f2d$export$9dbe89f9a87918c = (0, $26Zo0$styledcomponents).fieldset`
  display: flex;
  gap: ${(props) => props.theme.mimir.spacing.xxl};

  padding: ${(props) => props.theme.mimir.spacing.xl} ${(props) => props.theme.mimir.spacing.xl}
    ${(props) => props.theme.mimir.spacing.multiple(6)};

  border: 0;
  border-radius: ${(props) => props.theme.mimir.border.radius.medium};
  box-shadow: ${(props) => props.theme.mimir.shadow.medium};
  background-color: ${(props) => props.theme.mimir.color.text.on};

  ${(0, $cc3087a9fdba245d$export$4f72868321d0b640)};
`;
$6ac48fb302788f2d$export$9dbe89f9a87918c.defaultProps = {
  flexDirection: "column",
};

const $689b170d0b2af587$export$97ee2cbf37e5ebfe = ({ title: title, subtitle: subtitle }) =>
  /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $6e27437643813539$export$5fceefdeba78d15a), {
    as: "header",
    flexDirection: "column",
    children: [
      title &&
        /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
          as: "h1",
          children: title,
        }),
      subtitle &&
        /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
          as: "h2",
          children: subtitle,
        }),
    ],
  });

const $6a8a770e23835f0b$export$39c7ec7ed1888ce3 = (0, $26Zo0$styledcomponents).legend`
  color: ${(props) => (props.color != null ? props.color : props.theme.mimir.color.text.on)};
  background-color: ${(props) => (props.backgroundColor != null ? props.backgroundColor : props.theme.mimir.color.primary.base)};
  padding: ${(props) => props.theme.mimir.spacing.s} ${(props) => props.theme.mimir.spacing.l};
  padding-top: ${(props) => props.theme.mimir.spacing.s};
  margin-bottom: ${(props) => props.theme.mimir.spacing.xl};
  border-radius: ${(props) => props.theme.mimir.border.radius.small};
  box-shadow: ${(props) => props.theme.mimir.shadow.medium};
`;

const $29ede1263f6a59da$export$d7e1f420b25549ff = (0, $26Zo0$styledcomponents).div`
  padding: ${(props) => props.theme.mimir.spacing.xl};
  border-radius: ${(props) => props.theme.mimir.border.radius.large};
  background-color: ${(props) => (0, $b7d68aaa13a893fa$export$107ddc37a9b1adef)(props.theme.mimir.color.surface.base, 0.98)};
  color: ${(props) => props.theme.mimir.color.surface.on};
  box-shadow: ${(props) => props.theme.mimir.shadow.small};
  ${(0, $62135822dca75810$export$80711e28e77935d5)};
  ${(0, $34603d4f3a3fbd9a$export$e7171cddf5044e64)};
  ${(0, $67df19b86caf10c5$export$d7ddd398f22d79ef)};
`;

const $a42bded32577d99a$export$5b6b19405a83ff9d = ({
  children: children,
  content: content,
  onOpenChange: onOpenChange,
  placement: placement = "top",
  align: align = "center",
  offset: offset = 8,
  ...delegated
}) => {
  const theme = (0, $26Zo0$useTheme)();
  const containsTextOnly = typeof content === "string";
  return /*#__PURE__*/ (0, $26Zo0$jsxs)($26Zo0$Root4, {
    onOpenChange: onOpenChange,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$Trigger2, {
        asChild: true,
        children: children,
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$Portal2, {
        children: /*#__PURE__*/ (0, $26Zo0$jsx)($26Zo0$Content2, {
          asChild: true,
          avoidCollisions: true,
          sideOffset: offset,
          side: placement,
          align: align,
          children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $29ede1263f6a59da$export$d7e1f420b25549ff), {
            ...theme.mimir.animation.scale,
            ...delegated,
            children: containsTextOnly
              ? /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
                  variant: "body-medium",
                  textAlign: "center",
                  children: content,
                })
              : content,
          }),
        }),
      }),
    ],
  });
};

const $314dd15313e7d67f$export$b821cb5d358838ed = (0, $26Zo0$styledcomponents).input`
  height: 100%;
  width: 100%;

  border: 1px solid ${(props) => props.theme.mimir.color.outline.base};
  border-radius: ${(props) => props.theme.mimir.border.radius.medium};
  padding: ${(props) => props.theme.mimir.spacing.base} ${(props) => props.theme.mimir.spacing.l};
  padding-right: ${(props) => props.icon && props.iconPlacement === "right" && props.theme.mimir.spacing.multiple(6)};
  padding-left: ${(props) => props.icon && props.iconPlacement === "left" && props.theme.mimir.spacing.multiple(6)};

  background-color: ${(props) => props.theme.mimir.color.pure.base};
  color: ${(props) => props.theme.mimir.color.background.on};

  :disabled {
    color: ${(props) => props.theme.mimir.color.surface.variant.on};
    background-color: ${(props) => props.theme.mimir.color.outline.base};
  }

  box-sizing: border-box;

  ${(0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)("body-large")};
  ${(0, $34603d4f3a3fbd9a$export$e7171cddf5044e64)};
  ${(0, $70cc044a2d668431$export$c7187bbd1a7a9244)};
  ${(0, $67df19b86caf10c5$export$d7ddd398f22d79ef)};
`;
const $314dd15313e7d67f$export$6cc1a826121f1b89 = (0, $26Zo0$styledcomponents).span`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  left: ${(props) => props.icon && props.iconPlacement === "left" && props.theme.mimir.spacing.xl};
  right: ${(props) => props.icon && props.iconPlacement === "right" && props.theme.mimir.spacing.xl};
  color: ${(props) => props.theme.mimir.color.primary.base};
  line-height: 0;

  img,
  svg {
    width: 24px;
    height: 24px;
  }
`;

const $951afd8269218688$export$315ca1d286e31be8 = () => (0, $26Zo0$css)`
  height: 24px;
`;

const $860d0285946f79a6$export$c385a225e0ba64f2 = (0, $26Zo0$styledcomponents).div`
  display: flex;

  ${({ variant: variant }) => {
    switch (variant) {
      case "compact":
        return (0, $951afd8269218688$export$315ca1d286e31be8)();
    }
  }};

  ${(0, $cc3087a9fdba245d$export$4f72868321d0b640)};
  ${(0, $34603d4f3a3fbd9a$export$e7171cddf5044e64)};
  ${(0, $4742fce91a36bc96$export$661888f3c6187e4c)};
`;
$860d0285946f79a6$export$c385a225e0ba64f2.defaultProps = {
  variant: "standard",
};
const $860d0285946f79a6$export$b892961b7aae15ad = (0, $26Zo0$styledcomponents)((0, $314dd15313e7d67f$export$b821cb5d358838ed))`
  height: 100%;
  width: 100%;

  :disabled {
    color: ${(props) => props.theme.mimir.color.surface.variant.on};
    background-color: ${(props) => props.theme.mimir.color.surface.variant.base};
  }

  ${({ theme: theme, isDisabled: isDisabled }) =>
    isDisabled &&
    (0, $26Zo0$css)`
      color: ${theme.mimir.color.surface.variant.on} !important;
      background-color: ${theme.mimir.color.outline.base} !important;
    `};
`;

const $fc024a95fd496ffc$export$36b925efcc18a6cb = (0, $26Zo0$styledcomponents).div`
  .react-calendar {
    width: 350px;
    max-width: 100%;
    background-color: inherit;
    border: none;
    ${(0, $8f10d2c64a99fb76$export$4d9bf56aa526ad8a)("body-large")};
    border-radius: ${(props) => props.theme.mimir.border.radius.medium};
  }
  .react-calendar--doubleView {
    width: 700px;
  }
  .react-calendar--doubleView .react-calendar__viewContainer {
    display: flex;
    margin: -0.5em;
  }
  .react-calendar--doubleView .react-calendar__viewContainer > * {
    width: 50%;
    margin: 0.5em;
  }
  .react-calendar,
  .react-calendar *,
  .react-calendar *:before,
  .react-calendar *:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .react-calendar button {
    margin: 0;
    border: 0;
    outline: none;
  }
  .react-calendar button:enabled:hover {
    cursor: pointer;
  }
  .react-calendar__navigation {
    display: flex;
    height: 44px;
    margin-bottom: 1em;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    border-radius: ${(props) => props.theme.mimir.border.radius.medium};
  }
  .react-calendar__navigation button:disabled {
    background-color: ${(props) => props.theme.mimir.color.outline.base};
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: ${(props) => props.theme.mimir.color.secondary.container?.base};
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
    abbr {
      text-decoration: none;
    }
  }
  .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
  }
  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
  }
  .react-calendar__tile {
    max-width: 100%;
    padding: ${(props) => props.theme.mimir.spacing.l};
    background: none;
    text-align: center;
    line-height: 16px;
    border-radius: ${(props) => props.theme.mimir.border.radius.medium};
  }
  .react-calendar__tile:disabled {
    background-color: ${(props) => props.theme.mimir.color.outline.base};
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: ${(props) => props.theme.mimir.color.secondary.container?.base};
  }
  .react-calendar__tile--now {
    background-color: ${(props) => props.theme.mimir.color.secondary.container?.base};
    color: ${(props) => props.theme.mimir.color.text.base};
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background-color: ${(props) => props.theme.mimir.color.secondary.container?.base};
  }
  .react-calendar__tile--hasActive {
    background: ${(props) => props.theme.mimir.color.tertiary.container?.base};
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background-color: ${(props) => props.theme.mimir.color.secondary.container?.base};
  }
  .react-calendar__tile--active {
    background-color: ${(props) => props.theme.mimir.color.tertiary.container?.base};
    color: ${(props) => props.theme.mimir.color.text.base};
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: ${(props) => props.theme.mimir.color.secondary.container?.base};
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: ${(props) => props.theme.mimir.color.surface.variant.base};
  }
`;

const $503e099e11d1b648$export$d13df88085f0591c = /*#__PURE__*/ (0, $26Zo0$forwardRef)((props, ref) => {
  const { value: value, onItemChange: onItemChange } = props;
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $fc024a95fd496ffc$export$36b925efcc18a6cb), {
    children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$Calendar), {
      locale: "no",
      inputRef: ref,
      onChange: (value) => {
        if (value instanceof Date) onItemChange(value ?? undefined);
      },
      value: value ?? undefined,
    }),
  });
});
$503e099e11d1b648$export$d13df88085f0591c.displayName = "CalendarContent";

const $e03d31f9582382bc$export$b7ed69a880252dd = /*#__PURE__*/ (0, $26Zo0$forwardRef)((props, ref) => {
  const {
    icon: icon,
    onChange: onChange,
    value: value,
    placeholder: placeholder,
    disabled: disabled,
    reset: reset,
    inputHidden: inputHidden,
    iconSize: iconSize,
    buttonHeight: buttonHeight,
    ...rest
  } = props;
  const popoverButtonRef = (0, $26Zo0$useRef)(null);
  const theme = (0, $26Zo0$useTheme)();
  const [datevalue, setDateValue] = (0, $26Zo0$useState)((0, $26eef136237b9fb6$export$5e4cc6abec75530)(value));
  const onItemChange = (value) => {
    if (value != null && value !== undefined) {
      const now = new Date();
      value.setHours(now.getHours());
      value.setMinutes(now.getMinutes());
      value.setSeconds(now.getSeconds());
      setDateValue(value);
      if (onChange != null) onChange(value);
    } else {
      setDateValue(value);
      if (onChange != null) onChange(value);
    }
    popoverButtonRef.current?.click();
  };
  const onResetClick = () => {
    setDateValue(undefined);
    if (onChange != null) onChange(undefined);
  };
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  };
  return /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $860d0285946f79a6$export$c385a225e0ba64f2), {
    ...rest,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $860d0285946f79a6$export$b892961b7aae15ad), {
        type: inputHidden ? "hidden" : "text",
        placeholder: placeholder,
        value: datevalue?.toLocaleDateString("no", options) ?? "",
        disabled: true,
        isDisabled: disabled,
      }),
      reset &&
        /*#__PURE__*/ (0, $26Zo0$jsx)((0, $696f693fac81a609$export$353f5b6fc5456de1), {
          spacing: {
            ml: theme.mimir.spacing.s,
          },
          icon:
            icon != null
              ? icon
              : /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$Delete), {
                  size: iconSize,
                }),
          iconOnly: true,
          variant: "outlined",
          disabled: disabled,
          onClick: onResetClick,
          height: buttonHeight,
          children: "Kalender",
        }),
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $a42bded32577d99a$export$5b6b19405a83ff9d), {
        content: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $503e099e11d1b648$export$d13df88085f0591c), {
          onItemChange: onItemChange,
          value: datevalue != null ? datevalue : undefined,
          ref: ref,
        }),
        children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $696f693fac81a609$export$353f5b6fc5456de1), {
          spacing: {
            ml: theme.mimir.spacing.s,
          },
          icon:
            icon != null
              ? icon
              : /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$CalendarMonth), {
                  size: iconSize,
                }),
          iconOnly: true,
          variant: "outlined",
          disabled: disabled,
          ref: popoverButtonRef,
          height: buttonHeight,
          children: "Kalender",
        }),
      }),
    ],
  });
});
$e03d31f9582382bc$export$b7ed69a880252dd.displayName = "CalendarComponent";
$e03d31f9582382bc$export$b7ed69a880252dd.defaultProps = {
  alignItems: "center",
  alignContent: "center",
  value: undefined,
  placeholder: "The date is not set",
  disabled: false,
  reset: false,
  inputHidden: false,
  iconSize: 24,
  buttonHeight: "32",
};

const $005c9256d8ad3286$export$ab09149c4c8e7904 = (0, $26Zo0$styledcomponents)($26Zo0$Root5)`
  all: unset;
  position: relative;
  border-radius: ${(props) => props.theme.mimir.border.radius.small};
  color: ${(props) => props.theme.mimir.color.primary.base};
  height: 24px;
  width: 24px;

  :disabled {
    color: ${(props) => props.theme.mimir.color.outline.base};
    cursor: not-allowed;
  }

  :not(:disabled) {
    :hover {
      background-color: ${(props) => props.theme.mimir.color.secondary.container?.base};
    }

    :active {
      color: ${(props) => props.theme.mimir.color.surface.on};
    }
  }

  ${(0, $67df19b86caf10c5$export$d7ddd398f22d79ef)};
`;
const $005c9256d8ad3286$export$59aad738f51d1c05 = (0, $26Zo0$styledcomponents)($26Zo0$Indicator)``;
const $005c9256d8ad3286$export$bf5039b7e3732c5d = (0, $26Zo0$styledcomponents)((0, $26Zo0$CheckBoxOutlineBlank))`
  position: absolute;
  inset: 0;
`;
const $005c9256d8ad3286$export$eb9e6886cf3a9216 = (0, $26Zo0$styledcomponents)((0, $26Zo0$CheckBox))`
  position: absolute;
  inset: 0;
`;
const $005c9256d8ad3286$export$e8d13f6fda4719b9 = (0, $26Zo0$motion)($005c9256d8ad3286$export$ab09149c4c8e7904);

const $5820a23f7bab0dfc$export$48513f6b9f8ce62d = /*#__PURE__*/ (0, $26Zo0$forwardRef)((props, ref) => {
  const theme = (0, $26Zo0$useTheme)();
  return /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $005c9256d8ad3286$export$e8d13f6fda4719b9), {
    ref: ref,
    ...theme.mimir.animation.checkboxTap,
    ...props,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $005c9256d8ad3286$export$bf5039b7e3732c5d), {}),
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $005c9256d8ad3286$export$59aad738f51d1c05), {
        children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $005c9256d8ad3286$export$eb9e6886cf3a9216), {}),
      }),
    ],
  });
});
$5820a23f7bab0dfc$export$48513f6b9f8ce62d.displayName = "Checkbox";

const $a759f6a6082fb50d$export$f5b8910cec6cf069 = /*#__PURE__*/ (0, $26Zo0$forwardRef)((props, ref) => {
  const {
    width: width,
    maxWidth: maxWidth,
    minWidth: minWidth,
    height: height,
    maxHeight: maxHeight,
    minHeight: minHeight,
    icon: icon,
    iconPlacement: iconPlacement,
    type: type,
    ...delegated
  } = props;
  const isHidden = type === "hidden";
  return /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $da441300bfed1ab2$export$e71c4d32a2263218), {
    display: isHidden ? "none" : undefined,
    position: "relative",
    height: height,
    maxHeight: maxHeight,
    minHeight: minHeight,
    width: width,
    maxWidth: maxWidth,
    minWidth: minWidth,
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $314dd15313e7d67f$export$b821cb5d358838ed), {
        ref: ref,
        type: type,
        iconPlacement: iconPlacement,
        icon: icon,
        ...delegated,
      }),
      icon &&
        /*#__PURE__*/ (0, $26Zo0$jsx)((0, $314dd15313e7d67f$export$6cc1a826121f1b89), {
          iconPlacement: iconPlacement,
          icon: icon,
          children: /*#__PURE__*/ (0, $26Zo0$isValidElement)(icon)
            ? icon
            : /*#__PURE__*/ (0, $26Zo0$jsx)((0, $54dcd6617557221f$export$f04a61298a47a40f), {
                src: String(icon),
                alt: "",
              }),
        }),
    ],
  });
});
$a759f6a6082fb50d$export$f5b8910cec6cf069.displayName = "Input";
$a759f6a6082fb50d$export$f5b8910cec6cf069.defaultProps = {
  height: "40px",
  iconPlacement: "right",
};

const $2641b92129ff9542$export$7b29303ba393b4a6 = (0, $26Zo0$styledcomponents)($26Zo0$Root6)`
  all: unset;
  display: flex;
  flex-direction: ${(props) => props.orientation && props.orientation};
  gap: ${(props) => props.theme.mimir.spacing.l};
`;
const $2641b92129ff9542$export$9f866c100ef519e4 = (0, $26Zo0$styledcomponents)($26Zo0$Item)`
  all: unset;
  background-color: ${(props) => props.theme.mimir.color.surface.variant.base};
  width: 20px;
  height: 20px;
  border-radius: ${(props) => props.theme.mimir.border.radius.round};
  box-shadow: ${(props) => props.theme.mimir.shadow.small};

  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.mimir.color.secondary.container?.base};
  }

  :focus {
    box-shadow: ${(props) => props.theme.mimir.shadow.small};
  }
`;
const $2641b92129ff9542$export$5fb54c671a65c88 = (0, $26Zo0$styledcomponents)($26Zo0$Indicator1)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 50%;
    height: 50%;
    border-radius: ${(props) => props.theme.mimir.border.radius.round};
    background-color: ${(props) => props.theme.mimir.color.primary.base};
    margin: 25% auto;
  }
`;
const $2641b92129ff9542$export$bf3719c120ac700c = (0, $26Zo0$motion)($2641b92129ff9542$export$7b29303ba393b4a6);

const $065a64e6eba0c5b6$export$f4422ae58352e179 = ({
  options: options,
  direction: direction,
  onRadioChange: onRadioChange,
  ...rest
}) => {
  const theme = (0, $26Zo0$useTheme)();
  const [items, setItems] = (0, $26Zo0$useState)(options);
  const onValueChange = (value) => {
    const list = items?.map((item) => {
      if (item.value === value) {
        if (onRadioChange != null)
          onRadioChange({
            ...item,
            checked: true,
          });
        return {
          ...item,
          checked: true,
        };
      } else
        return {
          ...item,
          checked: false,
        };
    });
    setItems(list);
  };
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$Fragment), {
    children:
      options &&
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $2641b92129ff9542$export$bf3719c120ac700c), {
        onValueChange: onValueChange,
        orientation: direction,
        ...rest,
        children:
          items &&
          items.map((item) => {
            return /*#__PURE__*/ (0, $26Zo0$jsxs)(
              (0, $6e27437643813539$export$5fceefdeba78d15a),
              {
                alignItems: "center",
                alignContent: "center",
                children: [
                  /*#__PURE__*/ (0, $26Zo0$jsx)((0, $2641b92129ff9542$export$9f866c100ef519e4), {
                    checked: item.checked,
                    value: item.value,
                    id: item.value,
                    children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $2641b92129ff9542$export$5fb54c671a65c88), {}),
                  }),
                  /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
                    htmlFor: item.value,
                    as: "label",
                    variant: "label-medium",
                    spacing: {
                      ml: theme.mimir.spacing.l,
                    },
                    children: item.label,
                  }),
                ],
              },
              item.value
            );
          }),
      }),
  });
};
$065a64e6eba0c5b6$export$f4422ae58352e179.displayName = "RadioButton";
$065a64e6eba0c5b6$export$f4422ae58352e179.defaultProps = {
  options: [],
  direction: "row",
};

const $7e3cea35ade5a03c$export$988f442bad83a3dc = /*#__PURE__*/ (0, $26Zo0$forwardRef)((props, ref) => {
  const { value: value, width: width, height: height, placeholder: placeholder, onChange: onChange, ...delegated } = props;
  const theme = "snow";
  const disableStyle = {
    opacity: delegated.disabled ? 0.5 : 1.0,
  };
  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [
        {
          align: [],
        },
      ],
      [
        {
          list: "ordered",
        },
        {
          list: "bullet",
        },
      ],
      [
        {
          indent: "-1",
        },
        {
          indent: "+1",
        },
      ],
      [
        {
          header: [1, 2, 3, 4, 5, 6, false],
        },
      ],
      ["image"],
    ],
  };
  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "indent",
    "size",
    "header",
    "link",
    "image",
    "video",
    "color",
    "background",
    "clean",
  ];
  const { quill: quill, quillRef: quillRef } = (0, $26Zo0$useQuill)({
    theme: theme,
    modules: modules,
    formats: formats,
    placeholder: placeholder,
  });
  (0, $26Zo0$useEffect)(() => {
    if (quill) {
      quill.enable(!delegated.disabled);
      quill.clipboard.dangerouslyPasteHTML(value ?? "");
      quill.on("text-change", () => {
        if (onChange != null) onChange(quill.root.innerHTML);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quill, value]);
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $da441300bfed1ab2$export$e71c4d32a2263218), {
    style: disableStyle,
    height: height,
    width: width,
    ref: ref,
    ...delegated,
    children: /*#__PURE__*/ (0, $26Zo0$jsx)("div", {
      ref: quillRef,
    }),
  });
});
$7e3cea35ade5a03c$export$988f442bad83a3dc.displayName = "RichTextarea";
$7e3cea35ade5a03c$export$988f442bad83a3dc.defaultProps = {
  width: "100%",
  height: "fit-content",
  placeholder: "Enter your description here..",
};

const $6559bab0620ca275$export$816a1cbcb53d3af = (theme) => ({
  container: (base, state) => ({
    ...base,
    height: state.isMulti ? "auto" : "40px",
  }),
  control: (base, state) => ({
    ...base,
    boxShadow: "none",
    minWidth: "250px",
    width: "100%",
    minHeight: "40px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.color.outline.base,
    backgroundColor: state.isDisabled ? theme.color.outline.base : theme.color.pure.base,
    outline: state.isFocused ? `1px solid ${theme.color.primary.base}` : "revert",
    outlineOffset: "1px",
    "&:hover": {},
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  }),
  placeholder: (base, state) => ({
    ...base,
    color: state.isDisabled ? theme.color.surface.variant.on : theme.color.background.on,
  }),
  menu: (base) => ({
    ...base,
    minWidth: "250px",
    width: "100%",
    color: theme.color.surface.on,
    boxShadow: "none",
  }),
  menuList: (base) => ({
    ...base,
    boxShadow: "none",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: theme.color.outline.base,
    borderRadius: theme.border.radius.medium,
  }),
  valueContainer: (base) => ({
    ...base,
    paddingLeft: theme.spacing.l,
    paddingRight: theme.spacing.l,
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    color: theme.color.outline.base,
  }),
  singleValue: (base, state) => ({
    ...base,
    margin: 0,
    color: state.isDisabled ? theme.color.surface.variant.on : theme.color.background.on,
    font: theme.typography.roles.body.large.font,
    letterSpacing: theme.typography.roles.body.large.letterSpacing,
    lineHeight: theme.typography.roles.body.large.lineHeight,
  }),
  multiValue: (base, state) => ({
    ...base,
    color: state.isDisabled ? theme.color.surface.variant.on : theme.color.background.on,
    backgroundColor: state.isDisabled ? theme.color.surface.variant.base : theme.color.secondary.container?.on,
    borderRadius: theme.border.radius.small,
    font: theme.typography.roles.label.large.font,
    letterSpacing: theme.typography.roles.label.large.letterSpacing,
    lineHeight: theme.typography.roles.label.large.lineHeight,
  }),
  multiValueLabel: (base) => ({
    ...base,
    padding: theme.spacing.s,
    paddingLeft: theme.spacing.base,
  }),
  multiValueRemove: (base) => ({
    ...base,
    paddingLeft: theme.spacing.s,
    paddingRight: theme.spacing.s,
  }),
  option: (base, state) => {
    let backgroundColor = theme.color.pure.base;
    if (state.isFocused) backgroundColor = theme.color.secondary.container?.base ?? "";
    else if (state.isSelected) backgroundColor = theme.color.tertiary.container?.base ?? "";
    return {
      ...base,
      backgroundColor: backgroundColor,
      paddingLeft: theme.spacing.l,
      color: theme.color.background.on,
    };
  },
});

const $84caa8c0e9e38cdd$export$78e4e3e3b543e66e = (theme) => {
  const standard = (0, $6559bab0620ca275$export$816a1cbcb53d3af)(theme);
  const compactHeight = "24px";
  return {
    ...standard,
    container: (base, state) => {
      const standardBase = standard.container && standard.container(base, state);
      return {
        ...base,
        ...standardBase,
        height: compactHeight,
      };
    },
    control: (base, state) => {
      const standardBase = standard.control && standard.control(base, state);
      return {
        ...base,
        ...standardBase,
        minHeight: "revert",
        height: compactHeight,
      };
    },
    input: (base, state) => {
      const standardBase = standard.input && standard.input(base, state);
      return {
        ...base,
        ...standardBase,
        minHeight: "1px",
        margin: 0,
      };
    },
    valueContainer: (base, state) => {
      const standardBase = standard.valueContainer && standard.valueContainer(base, state);
      return {
        ...base,
        ...standardBase,
        height: "inherit",
        paddingTop: 0,
        paddingBottom: 0,
      };
    },
    clearIndicator: (base, state) => {
      const standardBase = standard.clearIndicator && standard.clearIndicator(base, state);
      return {
        ...base,
        ...standardBase,
        paddingTop: 0,
        paddingBottom: 0,
      };
    },
    dropdownIndicator: (base, state) => {
      const standardBase = standard.dropdownIndicator && standard.dropdownIndicator(base, state);
      return {
        ...base,
        ...standardBase,
        paddingTop: 0,
        paddingBottom: 0,
      };
    },
  };
};

const $1f15799bbf16fbf3$export$ef9b1a59e592288f = (props) => {
  const { variant: variant, selectRef: selectRef, ...reactSelectProps } = props;
  const theme = (0, $26Zo0$useTheme)();
  const customStyles = $1f15799bbf16fbf3$var$getSelectStyle(theme.mimir, variant);
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$reactselect), {
    ref: selectRef,
    styles: customStyles,
    ...reactSelectProps,
  });
};
/**
 * Uses the css-in-js wrapper for styling react-select
 *
 * See documentation link below for details.
 * @see https://react-select.com/styles#styles
 *
 * @param theme used to style the third party component to match the application's design
 * @param variant
 */ const $1f15799bbf16fbf3$var$getSelectStyle = (theme, variant) => {
  switch (variant) {
    case "compact":
      return (0, $84caa8c0e9e38cdd$export$78e4e3e3b543e66e)(theme);
    default:
      return (0, $6559bab0620ca275$export$816a1cbcb53d3af)(theme);
  }
};

const $f5949790f382766a$export$72f57f62e07710be = (0, $26Zo0$styledcomponents).div``;
const $f5949790f382766a$export$ba7509128d3a2a52 = (0, $26Zo0$styledcomponents).ul`
  border: 1px solid ${(props) => props.theme.mimir.color.outline.base};
  border-top-width: 0;
  list-style: none;
  margin-top: 3px;
  max-height: 143px;
  overflow-y: auto;
  padding-left: 0;
`;
const $f5949790f382766a$export$e2dc2ada7c8a7e5d = (0, $26Zo0$styledcomponents).li`
  padding: 0.5rem;

  &:active,
  &:hover,
  .user-active {
    background-color: ${(props) => props.theme.mimir.color.primary.base};
    color: ${(props) => props.theme.mimir.color.primary.on};
    cursor: pointer;
    font-weight: ${(props) => props.theme.mimir.typography.typeface.weights.bold};
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid ${(props) => props.theme.mimir.color.outline.base};
  }

  background-color: ${(props) => props.active && props.theme.mimir.color.primary.base};
  color: ${(props) => props.active && props.theme.mimir.color.primary.on};
  cursor: ${(props) => props.active && "pointer"};
  font-weight: ${(props) => props.active && props.theme.mimir.typography.typeface.weights.bold};
`;

const $0e8b50cb9746e0c1$export$dd2805e091597ff2 = /*#__PURE__*/ (0, $26Zo0$forwardRef)((props, ref) => {
  const { value: value, users: users, onItemChange: onItemChange, ...rest } = props;
  // Default user
  const defaultUserInput = () => {
    if (value == null || users == null) return "";
    const initialUser = users.find((x) => x.id === value);
    if (initialUser == null) return "";
    return initialUser.value;
  };
  // State
  const [selectedUserId, setSelectedUserId] = (0, $26Zo0$useState)(value ?? undefined);
  const [activeUser, setActiveUser] = (0, $26Zo0$useState)(0);
  const [filteredUsers, setFilteredUsers] = (0, $26Zo0$useState)([]);
  const [showUsers, setShowUsers] = (0, $26Zo0$useState)(false);
  const [userInput, setUserInput] = (0, $26Zo0$useState)(defaultUserInput);
  // Use effect
  (0, $26Zo0$useEffect)(() => {
    if (selectedUserId == null || users == null) return;
    const user = users.find((user) => user.id === selectedUserId);
    if (user == null) return;
    setUserInput(user.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0, $26Zo0$useEffect)(() => {
    setFilteredUsers(filter(userInput));
    setShowUsers(showUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput]);
  // User filter list
  const filter = (text) => {
    const f = [];
    if (text == null || text.trim() === "") return f;
    users.filter((user) => {
      const userValue = user.value.trim().toLowerCase();
      const textLowerCase = text.toLowerCase();
      const split = userValue.split(" ");
      if (
        userValue.startsWith(textLowerCase, 0) ||
        (split != null && split[0].startsWith(textLowerCase, 0)) ||
        split[split.length - 1].startsWith(textLowerCase, 0)
      )
        f.push(user);
    });
    return f;
  };
  const onChange = (e) => {
    const userInput = e.currentTarget.value;
    setUserInput(userInput);
    setShowUsers(true);
  };
  const onKeyDown = (e) => {
    // Enter key
    if (e.keyCode === 13) {
      e.preventDefault();
      setActiveUser(0);
      setShowUsers(false);
      setUserInput(filteredUsers[activeUser]?.value ?? "");
      setSelectedUserId(filteredUsers[activeUser]?.id ?? "");
      onItemChange && onItemChange(filteredUsers[activeUser]?.id ?? "");
    }
    // Up arrow
    if (e.keyCode === 38) {
      if (activeUser === 0) return;
      setActiveUser(activeUser - 1);
    }
    // Down arrow
    if (e.keyCode === 40) {
      if (activeUser - 1 === filteredUsers.length) return;
      setActiveUser(activeUser + 1);
    }
    // Delete
    if (e.keyCode === 46 || e.keyCode === 8) {
      e.preventDefault();
      setActiveUser(0);
      setShowUsers(false);
      setUserInput("");
      setSelectedUserId("");
      onItemChange && onItemChange("");
    }
  };
  const onClick = (e, id) => {
    setActiveUser(0);
    setFilteredUsers([]);
    setShowUsers(false);
    setUserInput(e.currentTarget.innerText);
    setSelectedUserId(id);
    onItemChange && onItemChange(id);
  };
  return /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $f5949790f382766a$export$72f57f62e07710be), {
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $a759f6a6082fb50d$export$f5b8910cec6cf069), {
        type: "text",
        onChange: onChange,
        onKeyDown: onKeyDown,
        value: userInput,
        ref: ref,
        ...rest,
      }),
      showUsers &&
        userInput &&
        filteredUsers.length > 0 &&
        /*#__PURE__*/ (0, $26Zo0$jsx)((0, $f5949790f382766a$export$ba7509128d3a2a52), {
          children: filteredUsers.map((user, index) => {
            return /*#__PURE__*/ (0, $26Zo0$jsx)(
              (0, $f5949790f382766a$export$e2dc2ada7c8a7e5d),
              {
                active: index === activeUser,
                onClick: (e) => onClick(e, user.id),
                children: user.value,
              },
              user.id
            );
          }),
        }),
    ],
  });
});
$0e8b50cb9746e0c1$export$dd2805e091597ff2.displayName = "UserAutoCompleteProps";

const $145c13d5377407de$export$6f134394432193e7 = (0, $26Zo0$styledcomponents)($26Zo0$Root7)`
  all: unset;
  width: 42px;
  height: 25px;
  background-color: ${(props) => props.theme.mimir.color.surface.variant.base};
  border-radius: 9999px;
  position: relative;
  box-shadow: ${(props) => props.theme.mimir.shadow.small};
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  :hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.mimir.color.secondary.container?.base};
  }

  :focus {
    box-shadow: ${(props) => props.theme.mimir.shadow.small};
  }
`;
const $145c13d5377407de$export$4d07bf653ea69106 = (0, $26Zo0$styledcomponents)($26Zo0$Thumb)`
  display: block;
  width: 21px;
  height: 21px;
  background-color: ${(props) => props.theme.mimir.color.text.on};
  border-radius: 9999px;
  box-shadow: ${(props) => props.theme.mimir.shadow.small};
  transition: transform 100ms;
  transform: translateX(2px);
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(19px);
    background-color: ${(props) => props.theme.mimir.color.primary.base};
  }
`;

const $be5aab2b1cf71957$export$4f67f25efd2613a8 = (props) => {
  const theme = (0, $26Zo0$useTheme)();
  const [status, setStatus] = (0, $26Zo0$useState)(props.checked);
  const onCheckedChange = (status) => {
    setStatus(status);
    if (props.onSwitchChange != null) props.onSwitchChange(status);
  };
  return /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $6e27437643813539$export$5fceefdeba78d15a), {
    alignItems: "center",
    children: [
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
        htmlFor: "airplane-mode",
        as: "label",
        variant: "label-medium",
        spacing: {
          mr: theme.mimir.spacing.l,
        },
        children: props.text,
      }),
      /*#__PURE__*/ (0, $26Zo0$jsx)((0, $145c13d5377407de$export$6f134394432193e7), {
        id: "airplane-mode",
        checked: status,
        onCheckedChange: onCheckedChange,
        children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $145c13d5377407de$export$4d07bf653ea69106), {}),
      }),
    ],
  });
};
$be5aab2b1cf71957$export$4f67f25efd2613a8.displayName = "SwitchComponent";
$be5aab2b1cf71957$export$4f67f25efd2613a8.defaultProps = {
  text: "",
  checked: false,
};

const $95064cb24a90d97c$export$b410431fab84fa58 = (0, $26Zo0$toast);

const $406f8669185e6302$export$bded10d9b0827aeb = (0, $26Zo0$styledcomponents).div`
  display: flex;
  width: fit-content;
  height: fit-content;
  margin: auto;
  flex-direction: row;
`;
const $406f8669185e6302$export$d8a48536dbcad893 = (0, $26Zo0$styledcomponents).div`
  display: flex;
  border-radius: 10px;
  min-height: ${(props) => props.nodeHeight}px;
  width: ${(props) => props.nodeWidth}px;
  font-size: 11px;
  text-align: center;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => props.colorMain};
  opacity: ${(props) => (props.hidden ? 0 : 1)};
  transition: border 250ms, opacity 250ms;
  padding: 0;
  border: 3px solid;
  border-color: ${(props) => props.colorMain} !important;
  margin: 0;
  opacity: ${(props) => (props.visible ? 1 : 0)};

  &:hover {
    border: 3px solid;
    border-color: ${(props) => props.colorSelected} !important;
  }

  &.selected {
    border: 3px solid;
    border-color: ${(props) => props.colorSelected} !important;
  }
`;
const $406f8669185e6302$export$49d341e6197bb092 = (0, $26Zo0$styledcomponents).div`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  gap: 5px;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-top: 10px;
`;

const $83f8c16986f12dec$export$ec1602e46eacee2c = (props) => {
  const theme = (0, $df0176613785fe08$export$74446bd855170621)();
  const { connectors: connectors, title: title, symbol: symbol, logo: logo, ...delegated } = props;
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $26Zo0$Fragment), {
    children:
      props.hidden == null ||
      (!props.hidden &&
        /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $406f8669185e6302$export$bded10d9b0827aeb), {
          children: [
            /*#__PURE__*/ (0, $26Zo0$jsx)((0, $143b5d0d90345639$export$179bb831147717ca), {
              side: "inside",
              direction: (0, $b2b3ee50df44f9d6$export$69674d1480aba23d).Input,
              connectors: connectors,
              ...delegated,
            }),
            /*#__PURE__*/ (0, $26Zo0$jsx)((0, $406f8669185e6302$export$d8a48536dbcad893), {
              ...delegated,
              className: props.selected ? "selected" : "",
              children: /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $406f8669185e6302$export$49d341e6197bb092), {
                children: [
                  title != null &&
                    /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
                      as: "p",
                      variant: "title-medium",
                      fontWeight: theme.typography.typeface.weights.bold,
                      useEllipsis: true,
                      ellipsisMaxLines: 2,
                      children: title,
                    }),
                  title != null &&
                    symbol != null &&
                    /*#__PURE__*/ (0, $26Zo0$jsx)((0, $d2e4eb53d530e7c5$export$236d96ef38f832f6), {
                      children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $a0616ba83d24d848$export$3e25e887b7a5b37b), {
                        source: symbol,
                        text: `${title} symbol`,
                      }),
                    }),
                  logo != null &&
                    /*#__PURE__*/ (0, $26Zo0$jsx)((0, $d2e4eb53d530e7c5$export$4a2034c9f860b7cd), {
                      className: "FlowNodeComponent-LogoBox",
                      children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $a0616ba83d24d848$export$3e25e887b7a5b37b), {
                        source: logo,
                        text: "Logo",
                      }),
                    }),
                ],
              }),
            }),
            /*#__PURE__*/ (0, $26Zo0$jsx)((0, $143b5d0d90345639$export$179bb831147717ca), {
              side: "outside",
              direction: (0, $b2b3ee50df44f9d6$export$69674d1480aba23d).Output,
              connectors: connectors,
              ...delegated,
            }),
          ],
        })),
  });
};
$83f8c16986f12dec$export$ec1602e46eacee2c.displayName = "FlowNodeComponent";
$83f8c16986f12dec$export$ec1602e46eacee2c.defaultProps = {
  connectors: [],
  storybook: false,
  title: undefined,
  symbol: undefined,
  logo: undefined,
  colorMain: "#FEF445",
  colorSelected: "#FBC913",
  selected: false,
  hidden: false,
  visible: true,
  nodeWidth: 160,
  nodeHeight: 95,
  connectorWidth: 19,
  connectorHeight: 19,
};

var $bb32ea2b917d8ad4$exports = {};

$parcel$export($bb32ea2b917d8ad4$exports, "ErrorMessage", () => $8a0f022c9089e3cd$export$915e9e7bd4f0f96d);
$parcel$export($bb32ea2b917d8ad4$exports, "InspectorPanel", () => $ebb656a48d91806c$export$6406ce20c6eab64d);

const $8a0f022c9089e3cd$export$915e9e7bd4f0f96d = ({
  title: title,
  subtitle: subtitle,
  status: status,
  linkText: linkText,
  linkPath: linkPath,
}) => {
  const theme = (0, $26Zo0$useTheme)();
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $da441300bfed1ab2$export$e71c4d32a2263218), {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    spacing: {
      p: theme.mimir.spacing.xxxl,
    },
    children: /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $da441300bfed1ab2$export$e71c4d32a2263218), {
      display: "flex",
      flexDirection: "column",
      gap: theme.mimir.spacing.xxxl,
      maxWidth: "60ch",
      children: [
        /*#__PURE__*/ (0, $26Zo0$jsx)((0, $21894e23ce5bb51f$export$a8a3e93435678ff9), {
          variant: "display-large",
          fontWeight: theme.mimir.typography.typeface.weights.bold,
          children: title,
        }),
        /*#__PURE__*/ (0, $26Zo0$jsx)((0, $21894e23ce5bb51f$export$a8a3e93435678ff9), {
          as: "h2",
          variant: "display-medium",
          children: subtitle,
        }),
        /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
          variant: "title-medium",
          children: status,
        }),
        /*#__PURE__*/ (0, $26Zo0$jsx)((0, $0a4fb0807d734a92$export$14892c202f726f14), {
          tabIndex: -1,
          to: linkPath,
          children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $696f693fac81a609$export$353f5b6fc5456de1), {
            tabIndex: 0,
            as: "span",
            variant: "text",
            textVariant: "label-large",
            spacing: {
              p: theme.mimir.spacing.s,
            },
            children: linkText,
          }),
        }),
      ],
    }),
  });
};

const $c40ca10e916b0a3b$export$a7b3ed5dd64a02b3 = (0, $26Zo0$styledcomponents).div`
  display: flex;
  align-items: center;
  background-color: ${(props) => (props.bgColor != null ? props.bgColor : "inherit")};
  height: 44px;
`;
const $c40ca10e916b0a3b$export$495fe843c8c1fde7 = (0, $26Zo0$styledcomponents).div`
  display: flex;
  width: 100%;
  align-items: center;
  ${(0, $4742fce91a36bc96$export$661888f3c6187e4c)};
`;
const $c40ca10e916b0a3b$export$a9bb97a5507b0b04 = (0, $26Zo0$styledcomponents).div`
  ${(0, $4742fce91a36bc96$export$661888f3c6187e4c)};
`;
const $c40ca10e916b0a3b$export$c959f21dad926d8e = (0, $26Zo0$styledcomponents).div`
  pointer-events: initial;
  box-sizing: border-box;
  min-width: 120px;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  color: #000;
  margin-right: 7px;
  height: ${(props) => (props.active ? 44 : 35)}px;
  margin-top: ${(props) => (props.active ? 0 : 9)}px;
  background-color: ${(props) => (props.active ? props.theme.mimir.color.reference.neutral[99] : props.color)};
  padding: ${(props) => (props.active ? "17px 14px 0px 14px;" : "8px 14px 0px 14px")};
  box-shadow: -4px 0 4px -5px rgba(0, 0, 0, 0.4), 4px 0 3px -5px rgba(0, 0, 0, 0.4);

  :hover {
    cursor: pointer;
  }
  p {
    bottom: ${(props) => (props.active ? 20 : 16)}px;
    font-weight: ${(props) => props.active && props.theme.mimir.typography.typeface.weights.bold};
    text-align: center;
  }
`;

const $ebb656a48d91806c$export$6406ce20c6eab64d = (props) => {
  const {
    duration: duration,
    children: children,
    isOpen: isOpen,
    isLocked: isLocked,
    onLock: onLock,
    onDelete: onDelete,
    onTabChange: onTabChange,
    icon: icon,
    name: name,
    tabColor: tabColor,
    selectedTab: selectedTab,
    bgColor: bgColor,
    spacing: spacing,
  } = props;
  const theme = (0, $df0176613785fe08$export$74446bd855170621)();
  const [expanded, setExpanded] = (0, $26Zo0$useState)(isOpen);
  const [lock, setLock] = (0, $26Zo0$useState)(isLocked);
  const [activeTab, setActiveTab] = (0, $26Zo0$useState)(selectedTab != null ? selectedTab : "admin");
  (0, $26Zo0$useEffect)(() => {
    setExpanded(isOpen);
  }, [isOpen]);
  (0, $26Zo0$useEffect)(() => {
    setLock(isLocked);
  }, [isLocked]);
  return /*#__PURE__*/ (0, $26Zo0$jsx)((0, $131d9058faf478d3$export$b252e133e2c7204f), {
    duration: duration,
    open: expanded,
    maxHeight: 600,
    header: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $c40ca10e916b0a3b$export$a7b3ed5dd64a02b3), {
      bgColor: bgColor,
      children: /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $c40ca10e916b0a3b$export$495fe843c8c1fde7), {
        spacing: spacing,
        children: [
          /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $da441300bfed1ab2$export$e71c4d32a2263218), {
            style: {
              display: "flex",
              flex: 1,
              alignItems: "center",
            },
            children: [
              /*#__PURE__*/ (0, $26Zo0$jsx)((0, $c40ca10e916b0a3b$export$c959f21dad926d8e), {
                color: tabColor != null ? tabColor : "",
                active: activeTab === "admin",
                onClick: () => {
                  setActiveTab("admin");
                  onTabChange && onTabChange("admin");
                },
                children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
                  useEllipsis: true,
                  ellipsisMaxLines: 1,
                  as: "p",
                  children: "Admin",
                }),
              }),
              /*#__PURE__*/ (0, $26Zo0$jsx)((0, $c40ca10e916b0a3b$export$c959f21dad926d8e), {
                color: tabColor != null ? tabColor : "",
                active: activeTab === "attribute",
                onClick: () => {
                  setActiveTab("attribute");
                  onTabChange && onTabChange("attribute");
                },
                children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
                  useEllipsis: true,
                  ellipsisMaxLines: 1,
                  as: "p",
                  children: "Attributes",
                }),
              }),
              /*#__PURE__*/ (0, $26Zo0$jsx)((0, $c40ca10e916b0a3b$export$c959f21dad926d8e), {
                color: tabColor != null ? tabColor : "",
                active: activeTab === "terminal",
                onClick: () => {
                  setActiveTab("terminal");
                  onTabChange && onTabChange("terminal");
                },
                children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
                  useEllipsis: true,
                  ellipsisMaxLines: 1,
                  as: "p",
                  children: "Terminal Attributes",
                }),
              }),
              /*#__PURE__*/ (0, $26Zo0$jsx)((0, $c40ca10e916b0a3b$export$c959f21dad926d8e), {
                color: tabColor != null ? tabColor : "",
                active: activeTab === "relation",
                onClick: () => {
                  setActiveTab("relation");
                  onTabChange && onTabChange("relation");
                },
                children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
                  useEllipsis: true,
                  ellipsisMaxLines: 1,
                  as: "p",
                  children: "Relations",
                }),
              }),
              /*#__PURE__*/ (0, $26Zo0$jsx)((0, $54dcd6617557221f$export$f04a61298a47a40f), {
                src: icon,
                alt: name,
                size: 24,
                style: {
                  marginLeft: theme.spacing.l,
                },
              }),
              /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
                as: "p",
                useEllipsis: true,
                fontWeight: 700,
                style: {
                  marginLeft: theme.spacing.s,
                },
                children: name,
              }),
            ],
          }),
          /*#__PURE__*/ (0, $26Zo0$jsxs)((0, $da441300bfed1ab2$export$e71c4d32a2263218), {
            style: {
              display: "flex",
              alignItems: "center",
            },
            children: [
              /*#__PURE__*/ (0, $26Zo0$jsx)((0, $696f693fac81a609$export$353f5b6fc5456de1), {
                onClick: () => {
                  onLock != null && onLock();
                  setLock(!lock);
                },
                variant: "outlined",
                icon: lock
                  ? /*#__PURE__*/ (0, $26Zo0$jsx)((0, $449944ba453b5c97$export$f53936b98653a113), {
                      size: 15,
                    })
                  : /*#__PURE__*/ (0, $26Zo0$jsx)((0, $449944ba453b5c97$export$8e05a58e6971f13d), {
                      size: 15,
                    }),
                spacing: {
                  ml: theme.spacing.s,
                },
                children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
                  as: "b",
                  fontWeight: 800,
                  spacing: {
                    mr: theme.spacing.s,
                  },
                  children: "Lock",
                }),
              }),
              /*#__PURE__*/ (0, $26Zo0$jsx)((0, $696f693fac81a609$export$353f5b6fc5456de1), {
                onClick: () => {
                  onDelete != null && onDelete();
                },
                variant: "outlined",
                icon: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $277f0bdbfcbac28f$export$1ae95d1a7411cb7b), {
                  size: 15,
                }),
                spacing: {
                  ml: theme.spacing.s,
                },
                children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
                  as: "b",
                  fontWeight: 800,
                  spacing: {
                    mr: theme.spacing.s,
                  },
                  children: "Delete",
                }),
              }),
              /*#__PURE__*/ (0, $26Zo0$jsx)((0, $696f693fac81a609$export$353f5b6fc5456de1), {
                onClick: () => setExpanded(!expanded),
                variant: "text",
                icon: expanded
                  ? /*#__PURE__*/ (0, $26Zo0$jsx)((0, $22dfeca7b2babd08$export$b0c3ddeace589b20), {
                      size: 15,
                    })
                  : /*#__PURE__*/ (0, $26Zo0$jsx)((0, $22dfeca7b2babd08$export$2d689d9a9f573512), {
                      size: 15,
                    }),
                spacing: {
                  ml: theme.spacing.s,
                },
                children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $de0207036bb3fe06$export$5f1af8db9871e1d6), {
                  as: "b",
                  fontWeight: 800,
                  spacing: {
                    mr: theme.spacing.s,
                  },
                  children: "Inspector",
                }),
              }),
            ],
          }),
        ],
      }),
    }),
    children: /*#__PURE__*/ (0, $26Zo0$jsx)((0, $c40ca10e916b0a3b$export$a9bb97a5507b0b04), {
      spacing: spacing,
      children: children,
    }),
  });
};
$ebb656a48d91806c$export$6406ce20c6eab64d.defaultProps = {
  duration: 0.5,
  isOpen: false,
  isLocked: false,
};

var $a354772b6b9870cb$exports = {};

export {
  $696f693fac81a609$export$353f5b6fc5456de1 as Button,
  $ab754ee3829129c7$export$39aecc95f0365819 as ConditionalWrapper,
  $0d6276d0028f6bba$export$2e0a83ec2e27ecbb as Divider,
  $143b5d0d90345639$export$179bb831147717ca as FlowConnectorComponent,
  $066b48d8e5b33e52$export$439d29a4e110a164 as VisuallyHidden,
  $54dcd6617557221f$export$f04a61298a47a40f as Icon,
  $a0616ba83d24d848$export$3e25e887b7a5b37b as Symbol,
  $d2e4eb53d530e7c5$export$4a2034c9f860b7cd as LogoBox,
  $d2e4eb53d530e7c5$export$236d96ef38f832f6 as SymbolBox,
  $131d9058faf478d3$export$b252e133e2c7204f as MotionPanel,
  $692dde140a8b09f1$export$2fb164ca5cfe7082 as ResizablePanel,
  $0a4fb0807d734a92$export$14892c202f726f14 as PlainLink,
  $8a61fa0583e81acb$export$7f7cbe89f1eacd2 as Spinner,
  $21894e23ce5bb51f$export$a8a3e93435678ff9 as Heading,
  $de0207036bb3fe06$export$5f1af8db9871e1d6 as Text,
  $6e97fa5953c89edb$export$28c660c63b792dea as Tooltip,
  $55921be34448eae0$export$6f0dace02a814e88 as SettingProvider,
  $a39d7373180be33b$export$12b0e20ae7d96a25 as useSetting,
  $94354bf9bddb77d8$export$86e2cef2561044ac as useLocalStorage,
  $df0176613785fe08$export$74446bd855170621 as useMimirorgTheme,
  $26eef136237b9fb6$export$260733d43c3dc50a as calculateDays,
  $26eef136237b9fb6$export$bd1203ad2e3208f7 as createDomainId,
  $26eef136237b9fb6$export$7149c6ffc9994c32 as createId,
  $26eef136237b9fb6$export$de3609038e2dcd26 as createNumberId,
  $26eef136237b9fb6$export$5e4cc6abec75530 as forceDate,
  $26eef136237b9fb6$export$637515699a57839b as getDomainFromId,
  $26eef136237b9fb6$export$c4d25c0d0c3b7f as ignoreCircularReferences,
  $26eef136237b9fb6$export$71b45186df786da8 as isdateBetween,
  $26eef136237b9fb6$export$5a466c0ba959b06 as removeTrailingSlashes,
  $1c87128f875a591e$export$37cc283d8fbd3462 as toBase64,
  $7bd8ff234e9a7c36$export$81e76f652c2aead0 as lsReadValue,
  $7bd8ff234e9a7c36$export$98bd917067ba65d5 as lsSaveValue,
  $b58947f94f33ca4a$export$613dacf2c09c65aa as MimirorgThemeProvider,
  $da441300bfed1ab2$export$e71c4d32a2263218 as Box,
  $da441300bfed1ab2$export$9dfcb7da7cf3aa86 as MotionBox,
  $6e27437643813539$export$5fceefdeba78d15a as Flexbox,
  $6e27437643813539$export$21b95509b28a7683 as MotionFlexbox,
  $717b690a15449498$export$926bf97b2b58e3ae as Gridbox,
  $717b690a15449498$export$a4d1ee21f95f7fcb as MotionGridbox,
  $e61374bbfe072911$export$3ddf2d174ce01153 as Dialog,
  $ca4291856ca5ea28$export$94e94c2ec2c954d5 as DialogDescription,
  $f0b76ef41432877d$export$57907242f1c228d4 as DialogExit,
  $48478f5908e23f0a$export$16f7638e4a34b909 as DialogTitle,
  $a9c06df81cd28ab5$export$69f33c96a751ad5e as FileComponent,
  $dbff3f1a6d6560d4$export$a7fed597f4b8afd8 as Form,
  $d259bdd2e0b678d6$export$48e635acc81ce1d as FormErrorBanner,
  $952d306367811240$export$56e87bf42978147a as FormField,
  $6ac48fb302788f2d$export$9dbe89f9a87918c as FormFieldset,
  $689b170d0b2af587$export$97ee2cbf37e5ebfe as FormHeader,
  $6a8a770e23835f0b$export$39c7ec7ed1888ce3 as FormLegend,
  $e03d31f9582382bc$export$b7ed69a880252dd as CalendarComponent,
  $5820a23f7bab0dfc$export$48513f6b9f8ce62d as Checkbox,
  $a759f6a6082fb50d$export$f5b8910cec6cf069 as Input,
  $065a64e6eba0c5b6$export$f4422ae58352e179 as RadioButton,
  $7e3cea35ade5a03c$export$988f442bad83a3dc as RichTextarea,
  $1f15799bbf16fbf3$export$ef9b1a59e592288f as Select,
  $2223269a322e756a$export$379139ebc1c2b235 as Textarea,
  $0e8b50cb9746e0c1$export$dd2805e091597ff2 as UserAutoComplete,
  $be5aab2b1cf71957$export$4f67f25efd2613a8 as SwitchComponent,
  $a42bded32577d99a$export$5b6b19405a83ff9d as Popover,
  $95064cb24a90d97c$export$b410431fab84fa58 as toast,
  $83f8c16986f12dec$export$ec1602e46eacee2c as FlowNodeComponent,
  $8a0f022c9089e3cd$export$915e9e7bd4f0f96d as ErrorMessage,
  $ebb656a48d91806c$export$6406ce20c6eab64d as InspectorPanel,
  $7c3fa5ba83403cda$export$b4f4531fd95c60ae as FunctionFilterIcon,
  $7c3fa5ba83403cda$export$b9b4845a188be90a as FunctionIcon,
  $7c3fa5ba83403cda$export$85bac42bead344b8 as LocationFilterIcon,
  $7c3fa5ba83403cda$export$ec1acb4261485f12 as LocationIcon,
  $7c3fa5ba83403cda$export$e6314745aeadbdb6 as ProductFilterIcon,
  $7c3fa5ba83403cda$export$1a199e029d5e93d6 as ProductIcon,
  $fa408cc5514c0ec6$export$237d50fb1de40e9e as CheckmarkCheckedIcon,
  $fa408cc5514c0ec6$export$189fca6c0c47ab1a as CheckmarkEmptyIcon,
  $fa408cc5514c0ec6$export$906a919e30cdbd5c as CheckmarkIcon,
  $c3a4bc69ae9a6bdc$export$c11effa3f20b3eeb as ConnectorBidirectionalIcon,
  $c3a4bc69ae9a6bdc$export$ad2923f1805795f as ConnectorDownstreamIcon,
  $c3a4bc69ae9a6bdc$export$b853f99e0a417737 as ConnectorIcon,
  $c3a4bc69ae9a6bdc$export$a9a784880f3d4de2 as ConnectorLocationIcon,
  $c3a4bc69ae9a6bdc$export$a3db873d595466b8 as ConnectorProductIcon,
  $c3a4bc69ae9a6bdc$export$a167e600995bf5ba as ConnectorTreeviewIcon,
  $c3a4bc69ae9a6bdc$export$e25dfd17f0cb1f77 as ConnectorUpstreamIcon,
  $c3a4bc69ae9a6bdc$export$65f64ce45d6e0daa as ConnectorVerticalIcon,
  $277f0bdbfcbac28f$export$eee90ad03a9b8ce5 as DeleteActiveIcon,
  $277f0bdbfcbac28f$export$42ab64235f40ba6c as DeleteDisabledIcon,
  $277f0bdbfcbac28f$export$1ae95d1a7411cb7b as DeleteIcon,
  $40d46121288fff2e$export$53ff5d0aaf0f6609 as AvatarBackgroundIcon,
  $40d46121288fff2e$export$efd394b233411f7a as BlockViewActiveIcon,
  $40d46121288fff2e$export$a01f8070dec64cc0 as BlockViewIcon,
  $40d46121288fff2e$export$4e57461601b6b5b2 as DarkModeIcon,
  $40d46121288fff2e$export$dbaed707686283bf as FilterActiveIcon,
  $40d46121288fff2e$export$28f6150e232898de as FilterIcon,
  $40d46121288fff2e$export$9a28dba4abd131fb as FitViewIcon,
  $40d46121288fff2e$export$ffa4d1c5f56b2bbd as HorizontalIcon,
  $40d46121288fff2e$export$f92a6081e4e1514c as LightModeIcon,
  $40d46121288fff2e$export$2c9e30524eeaa42e as LogoutIcon,
  $40d46121288fff2e$export$9657eb82c102a97c as NotificationsIcon,
  $40d46121288fff2e$export$ac4e8b8ca2b79f39 as SettingsIcon,
  $40d46121288fff2e$export$8b47fbdcab40bc56 as TreeViewActiveIcon,
  $40d46121288fff2e$export$d8189acd3db154bf as TreeViewIcon,
  $40d46121288fff2e$export$ba9edb5a0ba713fb as VerticalIcon,
  $a375e0e7383bd457$export$3030cdd17ffad81 as LibraryIcon,
  $449944ba453b5c97$export$f53936b98653a113 as LockClosedIcon,
  $449944ba453b5c97$export$37ea31f99740f2be as LockIcon,
  $449944ba453b5c97$export$8e05a58e6971f13d as LockOpenIcon,
  $c1ed2d6fbd8cc8c0$export$eed26074b425133a as LogoIcon,
  $22dfeca7b2babd08$export$722f8bfc785472cf as CollapseAccordionIcon,
  $22dfeca7b2babd08$export$fdbed76f4783dfe7 as CollapseAccordionNestedIcon,
  $22dfeca7b2babd08$export$67cd4f075b72ffc9 as CollapseIcon,
  $22dfeca7b2babd08$export$7ac3ebb6edb0e044 as CollapseWhiteIcon,
  $22dfeca7b2babd08$export$31901d6f7b9068da as ExpandedAccordionIcon,
  $22dfeca7b2babd08$export$ebe6507427cf15eb as ExpandedAccordionNestedIcon,
  $22dfeca7b2babd08$export$f5cb197ef241297f as ExpandedIcon,
  $22dfeca7b2babd08$export$763b5fdab3e2c08b as ExpandedWhiteIcon,
  $22dfeca7b2babd08$export$b0c3ddeace589b20 as ToogleDownIcon,
  $22dfeca7b2babd08$export$2d689d9a9f573512 as ToogleUpIcon,
};
//# sourceMappingURL=index.mjs.map
