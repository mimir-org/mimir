import { FunctionalIcon, ProductionIcon, LocationIcon } from "../../../assets";

interface Props {
  id: string;
  name: string;
}

const AspectInfo = ({ id, name }: Props) => {
  const Icon =
    id === "1"
      ? FunctionalIcon
      : id === "2"
      ? ProductionIcon
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
