import { AspectComponent } from "./aspectComponent/AspectComponent";
import { IsAspectNode } from "../../flow/helpers";
import red from "../../../redux/store";
import { NODE_TYPE } from "../../../models/project";
import { IsBlockView } from "../../flow/helpers/block";

export const ProjectComponent = () => {
  const project = red.store.getState().projectState.project;
  const aspects = project?.nodes ?? [];

  return (
    <>
      {!IsBlockView()
        ? aspects.map((obj: object, i: number) => {
            if (IsAspectNode(aspects[i].type)) {
              return (
                <AspectComponent
                  key={i}
                  nodeId={obj["id"]}
                  label={obj["label"]}
                  aspectType={obj["type"]}
                />
              );
            }
            return null;
          })
        : aspects.map((obj: object, i: number) => {
            if (
              IsAspectNode(aspects[i].type) &&
              aspects[i].type !== NODE_TYPE.ASPECT_PRODUCT
            ) {
              return (
                <AspectComponent
                  key={i}
                  nodeId={obj["id"]}
                  label={obj["label"]}
                  aspectType={obj["type"]}
                />
              );
            }
            return null;
          })}
    </>
  );
};

export default ProjectComponent;
