import React from "react";
import VisuallyHiddenSpan from "./styled/VisuallyHiddenSpan";

interface Props {
  delegated?: { [key: string]: unknown };
}

const VisuallyHidden = ({ children, ...delegated }: React.PropsWithChildren<Props>) => {
  return <VisuallyHiddenSpan {...delegated}>{children}</VisuallyHiddenSpan>;
};

export default VisuallyHidden;
