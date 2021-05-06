import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const GetModules = () => {
  const modules = useSelector<RootState>((state) => state.modules.type);

  return modules;
};

export default GetModules;
