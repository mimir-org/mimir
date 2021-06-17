class Project {
    id: string;
    version: string;
    name: string;
    description: string;
    projectOwner: string;
    updatedBy: string;
    update: Date;
    nodes: [];
    edges: [];

    // Constructor
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {

    }
}

export default Project;
