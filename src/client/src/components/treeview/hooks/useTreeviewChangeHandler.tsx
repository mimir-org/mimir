import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/index";

// Work in progress...
const useTreeviewChangeHandler = () => {
  const aspectList = useSelector<RootState>((state) => state.workspace);

  return aspectList;
};

export default useTreeviewChangeHandler;
