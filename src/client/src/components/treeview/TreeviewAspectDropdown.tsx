import { CategoryDescriptor } from "../../models/workspace";

interface Props {
  id: string;
  functional: CategoryDescriptor[];
  product: CategoryDescriptor[];
  location: CategoryDescriptor[];
}

const AspectDropdown = ({ id, functional, product, location }: Props) => {
  return (
    <div className="aspect_category">
      <select className="select_category">
        {id === "1"
          ? functional.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))
          : id === "2"
          ? product.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))
          : id === "3"
          ? location.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))
          : null}
      </select>
    </div>
  );
};

export default AspectDropdown;
