import Edge from "./Edge";
import Node from "./Node";

class Project {
    id: string;
    version: string;
    name: string;
    isSubProject: boolean;
    description: string;
    projectOwner: string;
    updatedBy: string;
    update: Date;
    nodes: Node[];
    edges: Edge[];

    // Constructor
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() { }
}

export default Project;
