export const OnMouseLeave = (setIsHover: (isHover: boolean) => void) => {
  setTimeout(function () {
    setIsHover(false);
  }, 3000);
};
