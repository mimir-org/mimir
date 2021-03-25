import {
  ProductionIcon,
  FunctionalIcon,
  LocationIcon,
} from "../../../../assets/";

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside>
      <div className="description">Aspects</div>
      <div
        className="dndnode function"
        onDragStart={(event) => onDragStart(event, "function")}
        draggable
      >
        Function
        <img
          src={FunctionalIcon}
          width="30px"
          height="30px"
          alt="func-icon"
        ></img>
      </div>

      <div
        className="dndnode product"
        onDragStart={(event) => onDragStart(event, "product")}
        draggable
      >
        Product
        <img
          src={ProductionIcon}
          width="30px"
          height="30px"
          alt="prod-icon"
        ></img>
      </div>
      <div
        className="dndnode location"
        onDragStart={(event) => onDragStart(event, "location")}
        draggable
      >
        Location
        <img
          src={LocationIcon}
          width="30px"
          height="30px"
          alt="location-icon"
        ></img>
      </div>
    </aside>
  );
};

export default Sidebar;
