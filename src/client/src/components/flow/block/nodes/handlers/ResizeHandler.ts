const ResizeHandler = (setScreenWidth: any) => {
  const updateScreenSize = () => {
    setScreenWidth(window.innerWidth);
  };

  window.onresize = updateScreenSize;
};

export default ResizeHandler;
