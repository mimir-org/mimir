import { VisualFilterResources } from "../../../../textResources";
import { Header } from "../styled";

const GetContent = (items: number, parent: boolean, section: number) => {
  let text = VisualFilterResources.slice(
    section + 4,
    VisualFilterResources.length - 1
  );

  return [...Array(items)].map((i, index) => {
    return (
      <>
        {index === 0 && parent && (
          <Header>{VisualFilterResources[section]}</Header>
        )}
        <label className={"checkbox"}>
          <input type="checkbox" checked={false} onChange={() => null} />
          <span className="checkmark"></span>
          <label className="checkbox_label">{text[index]}</label>
        </label>
      </>
    );
  });
};

export default GetContent;
