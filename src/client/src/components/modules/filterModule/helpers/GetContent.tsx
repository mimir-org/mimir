import { VisualFilterResources } from "../../../../textResources";
import { Header } from "../styled";

const GetContent = (test, parent, headerIndex) => {
  let text = VisualFilterResources.slice(
    headerIndex + 3,
    VisualFilterResources.length - 1
  );

  return (
    <>
      {[...Array(test)].map((i, index) => {
        return index === 0 && parent ? (
          <>
            <Header>{VisualFilterResources[headerIndex]}</Header>
            <label className={"checkbox"}>
              <input type="checkbox" checked={true} onChange={() => null} />
              <span className="checkmark"></span>
              <label className="checkbox_label">{text[index]}</label>
            </label>
          </>
        ) : (
          <label className={"checkbox"}>
            <input type="checkbox" checked={true} onChange={() => null} />
            <span className="checkmark"></span>
            <label className="checkbox_label">{text[index]}</label>
          </label>
        );
      })}
    </>
  );
};

export default GetContent;
