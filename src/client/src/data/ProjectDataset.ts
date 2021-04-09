import { NODE_TYPE, ICON_TYPE, CONNECTOR_TYPE } from "../models/project";
import { createId } from "../components/flow/utils";

export default class ProjectDataset {
  static create() {
    return new Promise((resolve) => {
      let project = {
        id: "C4F2AA42-C3A3-416D-9489-8851779126A7",
        name: "Noaka",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget tristique magna, vel suscipit turpis. Donec viverra turpis et ante sodales scelerisque.",
        nodes: [
          {
            id: createId(),
            name: "Function",
            label: "Function",
            type: NODE_TYPE.ASPECT,
            position: { x: 150, y: 5 },
            connectors: [
              { id: createId(), name: "", type: CONNECTOR_TYPE.PARTOF_OUTPUT },
            ],
            icon: ICON_TYPE.FUNCTION_ICON,
            isHidden: false,
          },
          {
            id: createId(),
            name: "Product",
            label: "Product",
            type: NODE_TYPE.ASPECT,
            position: { x: 600, y: 5 },
            connectors: [
              { id: createId(), name: "", type: CONNECTOR_TYPE.PARTOF_OUTPUT },
            ],
            icon: ICON_TYPE.PRODUCT_ICON,
            isHidden: false,
          },
          {
            id: createId(),
            name: "Location",
            label: "Location",
            type: NODE_TYPE.ASPECT,
            position: { x: 1050, y: 5 },
            connectors: [
              { id: createId(), name: "", type: CONNECTOR_TYPE.PARTOF_OUTPUT },
            ],
            icon: ICON_TYPE.LOCATION_ICON,
            isHidden: false,
          },
        ],
        edges: [],
      };

      setInterval(() => {
        resolve(project);
      }, 50);
    });
  }

  static get(id) {
    return new Promise((resolve) => {
      let projects = [
        {
          id: "95C10DAB-0DAD-4CBB-B33E-CA0A3CBC500C",
          name: "Noaka",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget tristique magna, vel suscipit turpis. Donec viverra turpis et ante sodales scelerisque.",
          nodes: [
            {
              id: "1236538d-0015-e5ea-ea4d-d2dce68e3ce5",
              name: "Function",
              label: "Function",
              type: NODE_TYPE.ASPECT,
              position: { x: 150, y: 5 },
              icon: ICON_TYPE.FUNCTION_ICON,
              isHidden: false,
              connectors: [
                {
                  id: "38f08e68-b8f8-62cd-b710-9a6e8ca97b06",
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_OUTPUT,
                },
              ],
            },
            {
              id: "c000cbb3-771a-9d9f-5439-fa2cb78b758f",
              name: "Product",
              label: "Product",
              type: NODE_TYPE.ASPECT,
              position: { x: 600, y: 5 },
              icon: ICON_TYPE.PRODUCT_ICON,
              isHidden: false,
              connectors: [
                {
                  id: createId(),
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_OUTPUT,
                },
              ],
            },
            {
              id: createId(),
              name: "Location",
              label: "Location",
              type: NODE_TYPE.ASPECT,
              position: { x: 1050, y: 5 },
              icon: ICON_TYPE.LOCATION_ICON,
              isHidden: false,
              connectors: [
                {
                  id: createId(),
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_OUTPUT,
                },
              ],
            },
            {
              id: "88ab517b-a575-3760-4860-f2cb6848c30a",
              name: "NOAKA",
              label: "NOAKA",
              type: NODE_TYPE.FUNCTION,
              position: { x: 50, y: 150 },
              icon: ICON_TYPE.FUNCTION_ICON,
              isHidden: false,
              connectors: [
                {
                  id: "C02AD125-8619-4C8C-841D-FBED1588F6A4",
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_INPUT,
                },
                {
                  id: "16B36F07-2885-4DB6-AAF7-A3122B740EB4",
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_OUTPUT,
                },
                {
                  id: "31A53D61-0D3F-4CA8-A693-C797CDA5F89D",
                  name: "",
                  type: CONNECTOR_TYPE.RELATION_OUTPUT,
                },
              ],
            },
            {
              id: "373425a5-6c3d-8e68-4348-a8306fdcfc81",
              name: "Reservoir",
              label: "Reservoir",
              type: NODE_TYPE.FUNCTION,
              position: { x: 250, y: 150 },
              icon: ICON_TYPE.FUNCTION_ICON,
              isHidden: false,
              connectors: [
                {
                  id: "6A29EC2B-7DA8-4EC4-8C0A-FFAE083930C9",
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_INPUT,
                },
                {
                  id: "92D858F2-BA42-4E71-9EA1-93EA14C7A985",
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_OUTPUT,
                },
                {
                  id: "5B6F47F4-3BFD-4033-BF6D-3B44DE0D56E7",
                  name: "",
                  type: CONNECTOR_TYPE.RELATION_OUTPUT,
                },
              ],
            },
          ],
          edges: [
            {
              id: "d938feda-5f65-07f0-99c7-523f85821a86",
              fromConnector: "38f08e68-b8f8-62cd-b710-9a6e8ca97b06",
              toConnector: "C02AD125-8619-4C8C-841D-FBED1588F6A4",
              fromNode: "1236538d-0015-e5ea-ea4d-d2dce68e3ce5",
              toNode: "88ab517b-a575-3760-4860-f2cb6848c30a",
              isHidden: false,
              parentType: NODE_TYPE.FUNCTION,
            },
            {
              id: "f6cb4e3c-5793-c402-fb94-feb5ee1d8484",
              fromConnector: "38f08e68-b8f8-62cd-b710-9a6e8ca97b06",
              toConnector: "6A29EC2B-7DA8-4EC4-8C0A-FFAE083930C9",
              fromNode: "1236538d-0015-e5ea-ea4d-d2dce68e3ce5",
              toNode: "373425a5-6c3d-8e68-4348-a8306fdcfc81",
              isHidden: false,
              parentType: NODE_TYPE.FUNCTION,
            },
          ],
        },
        {
          id: "95C10DAB-0DAD-4CBB-B33E-CA0A3CBC500C",
          name: "JSV",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget tristique magna, vel suscipit turpis. Donec viverra turpis et ante sodales scelerisque.",
          nodes: [
            {
              id: createId(),
              name: "Function",
              label: "Function",
              type: NODE_TYPE.ASPECT,
              position: { x: 150, y: 5 },
              connectors: [
                {
                  id: createId(),
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_OUTPUT,
                },
              ],
              icon: ICON_TYPE.FUNCTION_ICON,
            },
            {
              id: createId(),
              name: "Product",
              label: "Product",
              type: NODE_TYPE.ASPECT,
              position: { x: 600, y: 5 },
              connectors: [
                {
                  id: createId(),
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_OUTPUT,
                },
              ],
              icon: ICON_TYPE.PRODUCT_ICON,
            },
            {
              id: createId(),
              name: "Location",
              label: "Location",
              type: NODE_TYPE.ASPECT,
              position: { x: 1050, y: 5 },
              connectors: [
                {
                  id: createId(),
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_OUTPUT,
                },
              ],
              icon: ICON_TYPE.LOCATION_ICON,
            },
          ],
          edges: [],
        },
      ];

      setInterval(() => {
        resolve(projects.find((x) => x.id === id));
      }, 500);
    });
  }

  static getAllProjects() {
    return new Promise((resolve) => {
      let projects = [
        {
          id: "95C10DAB-0DAD-4CBB-B33E-CA0A3CBC500C",
          name: "Noaka",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget tristique magna, vel suscipit turpis. Donec viverra turpis et ante sodales scelerisque.",
          nodes: [],
          edges: [],
        },
        {
          id: "95C10DAB-0DAD-4CBB-B33E-CA0A3CBC500C",
          name: "JSV",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget tristique magna, vel suscipit turpis. Donec viverra turpis et ante sodales scelerisque.",
          nodes: [],
          edges: [],
        },
      ];

      setInterval(() => {
        resolve(projects);
      }, 500);
    });
  }
}
