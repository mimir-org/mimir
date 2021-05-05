const GetReactFlowBoundingRectData = (): [number, number] => {
  var elem = document.getElementsByClassName("react-flow")[0];

  if (elem) {
    const rect = elem.getBoundingClientRect();
    return [rect.width, rect.height];
  } else {
    return [0, 0];
  }
};

export default GetReactFlowBoundingRectData;
