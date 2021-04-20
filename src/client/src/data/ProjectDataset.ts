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
            type: NODE_TYPE.ASPECT_FUNCTION,
            position: { x: 150, y: 5 },
            connectors: [
              { id: createId(), name: "", type: CONNECTOR_TYPE.PARTOF_OUTPUT },
            ],
            icon: ICON_TYPE.FUNCTION_ICON,
            isHidden: false,
            isSelected: false,
          },
          {
            id: createId(),
            name: "Product",
            label: "Product",
            type: NODE_TYPE.ASPECT_PRODUCT,
            position: { x: 600, y: 5 },
            connectors: [
              { id: createId(), name: "", type: CONNECTOR_TYPE.PARTOF_OUTPUT },
            ],
            icon: ICON_TYPE.PRODUCT_ICON,
            isHidden: false,
            isSelected: false,
          },
          {
            id: createId(),
            name: "Location",
            label: "Location",
            type: NODE_TYPE.ASPECT_LOCATION,
            position: { x: 1050, y: 5 },
            connectors: [
              { id: createId(), name: "", type: CONNECTOR_TYPE.PARTOF_OUTPUT },
            ],
            icon: ICON_TYPE.LOCATION_ICON,
            isHidden: false,
            isSelected: false,
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
              name: NODE_TYPE.FUNCTION,
              label: NODE_TYPE.FUNCTION,
              type: NODE_TYPE.ASPECT_FUNCTION,
              position: { x: 150, y: 5 },
              icon: ICON_TYPE.FUNCTION_ICON,
              isHidden: false,
              isSelected: false,
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
              name: NODE_TYPE.PRODUCT,
              label: NODE_TYPE.PRODUCT,
              type: NODE_TYPE.ASPECT_PRODUCT,
              position: { x: 600, y: 5 },
              icon: ICON_TYPE.PRODUCT_ICON,
              isHidden: false,
              isSelected: false,
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
              name: NODE_TYPE.LOCATION,
              label: NODE_TYPE.LOCATION,
              type: NODE_TYPE.ASPECT_LOCATION,
              position: { x: 1050, y: 5 },
              icon: ICON_TYPE.LOCATION_ICON,
              isHidden: false,
              isSelected: false,
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
              isSelected: false,
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
              id: "88ab517b-a575-3760-4860-f2cb6848c30ab",
              name: "Ocean",
              label: "Ocean",
              type: NODE_TYPE.FUNCTION,
              position: { x: 50, y: 300 },
              icon: ICON_TYPE.FUNCTION_ICON,
              isHidden: false,
              isSelected: false,
              connectors: [
                {
                  id: "C02AD125-8619-4C8C-841D-FBED1588F6A4b",
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_INPUT,
                },
                {
                  id: "16B36F07-2885-4DB6-AAF7-A3122B740EB4b",
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_OUTPUT,
                },
                {
                  id: "31A53D61-0D3F-4CA8-A693-C797CDA5F89Db",
                  name: "",
                  type: CONNECTOR_TYPE.RELATION_OUTPUT,
                },
              ],
            },

            {
              id: "88ab517b-a575-3760-4860-f2cb6848c30abzz",
              name: "Fulla",
              label: "Fulla",
              type: NODE_TYPE.FUNCTION,
              position: { x: 50, y: 450 },
              icon: ICON_TYPE.FUNCTION_ICON,
              isHidden: false,
              isSelected: false,
              connectors: [
                {
                  id: "C02AD125-8619-4C8C-841D-FBED1588F6A4bzz",
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_INPUT,
                },
                {
                  id: "16B36F07-2885-4DB6-AAF7-A3122B740EB4bzz",
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_OUTPUT,
                },
                {
                  id: "31A53D61-0D3F-4CA8-A693-C797CDA5F89Dbzz",
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
              isSelected: false,
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
            {
              id: "365bf405-a2db-cf39-5a9f-8b9c1a615fc4",
              name: "Ocean",
              label: "Ocean",
              type: NODE_TYPE.FUNCTION,
              position: { x: 250, y: 300 },
              icon: ICON_TYPE.FUNCTION_ICON,
              isHidden: false,
              isSelected: false,
              connectors: [
                {
                  id: "DCAE455A-EC46-4FFA-BCE5-958B5AC557B4",
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_INPUT,
                },
                {
                  id: "DAAF909B-4EB9-4779-8875-B7FFDD49E776",
                  name: "",
                  type: CONNECTOR_TYPE.PARTOF_OUTPUT,
                },
                {
                  id: "0E6178B5-85A7-4D0E-BD91-5105AB4BE7CD",
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
              parentType: NODE_TYPE.ASPECT_FUNCTION,
            },
            {
              id: "d938feda-5f65-07f0-99c7-523f85821a86b",
              fromConnector: "16B36F07-2885-4DB6-AAF7-A3122B740EB4",
              toConnector: "C02AD125-8619-4C8C-841D-FBED1588F6A4b",
              fromNode: "88ab517b-a575-3760-4860-f2cb6848c30a",
              toNode: "88ab517b-a575-3760-4860-f2cb6848c30ab",
              isHidden: false,
              parentType: NODE_TYPE.FUNCTION,
            },
            {
              id: "d938feda-5f65-07f0-99c7-523f85821a86bzz",
              fromConnector: "16B36F07-2885-4DB6-AAF7-A3122B740EB4b",
              toConnector: "C02AD125-8619-4C8C-841D-FBED1588F6A4bzz",
              fromNode: "88ab517b-a575-3760-4860-f2cb6848c30ab",
              toNode: "88ab517b-a575-3760-4860-f2cb6848c30abzz",
              isHidden: false,
              parentType: NODE_TYPE.FUNCTION,
            },
            {
              id: "c858f277-e248-d92a-f23c-1db0335de446",
              fromConnector: "38f08e68-b8f8-62cd-b710-9a6e8ca97b06",
              toConnector: "6A29EC2B-7DA8-4EC4-8C0A-FFAE083930C9",
              fromNode: "1236538d-0015-e5ea-ea4d-d2dce68e3ce5",
              toNode: "373425a5-6c3d-8e68-4348-a8306fdcfc81",
              isHidden: false,
              parentType: NODE_TYPE.ASPECT_FUNCTION,
            },
            {
              id: "50740a21-401e-d614-034a-5226db792930",
              fromConnector: "92D858F2-BA42-4E71-9EA1-93EA14C7A985",
              toConnector: "DCAE455A-EC46-4FFA-BCE5-958B5AC557B4",
              fromNode: "373425a5-6c3d-8e68-4348-a8306fdcfc81",
              toNode: "365bf405-a2db-cf39-5a9f-8b9c1a615fc4",
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
              type: NODE_TYPE.ASPECT_FUNCTION,
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
              type: NODE_TYPE.ASPECT_PRODUCT,
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
              type: NODE_TYPE.ASPECT_LOCATION,
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
