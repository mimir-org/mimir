import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/index";

const useTreeviewChangeHandler = () => {
  // const aspectList = useSelector<RootState>((state) => state.workspace);

  const test = "one";
  console.log(test);
  return test;
};

export default useTreeviewChangeHandler;
