const GetBlockHeight = (inputs: number, outputs: number): number => {
  let height = 115;
  if (inputs >= 5 || outputs >= 5) height = 200;
  if (inputs >= 10 || outputs >= 10) height = 285;
  if (inputs >= 15 || outputs >= 15) height = 370;
  if (inputs >= 19 || outputs >= 19) height = 420;
  return height;
};

export default GetBlockHeight;
