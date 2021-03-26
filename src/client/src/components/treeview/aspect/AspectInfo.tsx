import { FunctionIcon, ProductIcon, LocationIcon } from "../../../assets";

interface Props {
  id: string;
  name: string;
}

const AspectInfo = ({ id, name }: Props) => {
  const Icon =
    id === "1"
      ? FunctionIcon
      : id === "2"
      ? ProductIcon
      : id === "3"
      ? LocationIcon
      : null;

  return (
    <div className="aspect_heading">
      <img src={Icon} alt="aspect-icon"></img>
      <p>{name}</p>
    </div>
  );
};

export default AspectInfo;
