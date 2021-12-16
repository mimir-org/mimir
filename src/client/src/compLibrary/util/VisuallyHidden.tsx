import VisuallyHiddenSpan from "./styled/VisuallyHiddenSpan";

const VisuallyHidden = ({ children, ...delegated }) => {
  return (
    <VisuallyHiddenSpan {...delegated}>
      {children}
    </VisuallyHiddenSpan>
  );
};

export default VisuallyHidden;