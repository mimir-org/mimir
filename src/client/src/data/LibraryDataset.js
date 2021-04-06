import { ICON_TYPE, NODE_TYPE, CONNECTOR_TYPE } from '../models/project';

export default class LibraryDataset {
  static getAll() {
    return new Promise((resolve) => {
      let dataset = [
        {
            id: 1,
            name: "Reservoir",
            label: null,
            icon: ICON_TYPE.FUNCTION_ICON,          
            type: NODE_TYPE.FUNCTION,
            connectors: [
                {
                    id: "6A29EC2B-7DA8-4EC4-8C0A-FFAE083930C9",
                    name: '',
                    type: CONNECTOR_TYPE.PARTOF_INPUT
                },
                {
                    id: "92D858F2-BA42-4E71-9EA1-93EA14C7A985",
                    name: '',
                    type: CONNECTOR_TYPE.PARTOF_OUTPUT
                },
                {
                    id: "5B6F47F4-3BFD-4033-BF6D-3B44DE0D56E7",
                    name: '',
                    type: CONNECTOR_TYPE.RELATION_OUTPUT
                }
            ],
            category: ''
        },
        {
            id: 2,
            name: "Ocean",
            label: null,
            icon: ICON_TYPE.FUNCTION_ICON,          
            type: NODE_TYPE.FUNCTION,
            connectors: [
                {
                    id: "DCAE455A-EC46-4FFA-BCE5-958B5AC557B4",
                    name: '',
                    type: CONNECTOR_TYPE.PARTOF_INPUT
                },
                {
                    id: "DAAF909B-4EB9-4779-8875-B7FFDD49E776",
                    name: '',
                    type: CONNECTOR_TYPE.PARTOF_OUTPUT
                },
                {
                    id: "0E6178B5-85A7-4D0E-BD91-5105AB4BE7CD",
                    name: '',
                    type: CONNECTOR_TYPE.RELATION_OUTPUT
                }
            ],
            category: ''
        },
        {
            id: 3,
            name: "NOAKA",
            label: null,
            icon: ICON_TYPE.FUNCTION_ICON,          
            type: NODE_TYPE.FUNCTION,
            connectors: [
                {
                    id: "C02AD125-8619-4C8C-841D-FBED1588F6A4",
                    name: '',
                    type: CONNECTOR_TYPE.PARTOF_INPUT
                },
                {
                    id: "16B36F07-2885-4DB6-AAF7-A3122B740EB4",
                    name: '',
                    type: CONNECTOR_TYPE.PARTOF_OUTPUT
                },
                {
                    id: "31A53D61-0D3F-4CA8-A693-C797CDA5F89D",
                    name: '',
                    type: CONNECTOR_TYPE.RELATION_OUTPUT
                }
            ],
            category: ''
        },
        {
            id: 4,
            name: "Motor f/Pump B",
            label: null,
            icon: ICON_TYPE.FUNCTION_ICON,          
            type: NODE_TYPE.FUNCTION,
            connectors: [
                {
                    id: "6C860FA5-B732-463B-8B26-BC7341702C92",
                    name: '',
                    type: CONNECTOR_TYPE.PARTOF_INPUT
                },
                {
                    id: "9F4C5DCA-2538-4DB1-B148-1B7DF29EE100",
                    name: '',
                    type: CONNECTOR_TYPE.PARTOF_OUTPUT
                },
                {
                    id: "460CFCD0-2AB3-46E6-9C60-DC0A3A874788",
                    name: '',
                    type: CONNECTOR_TYPE.RELATION_OUTPUT
                }
            ],
            category: ''
        },
        {
            id: 5,
            name: "SQ Motor",
            label: "IC411 SQ Motor",
            icon: ICON_TYPE.PRODUCT_ICON,          
            type: NODE_TYPE.PRODUCT,
            connectors: [
                {
                    id: "6BB587DF-6FCF-4C75-B16B-6E7FAEF936ED",
                    name: '',
                    type: CONNECTOR_TYPE.PARTOF_INPUT
                },
                {
                    id: "AB15C15A-079C-4D07-808D-20948D209872",
                    name: '',
                    type: CONNECTOR_TYPE.PARTOF_OUTPUT
                },
                {
                    id: "547B96ED-0A77-465F-9F9C-18E9876CA1FE",
                    name: '',
                    type: CONNECTOR_TYPE.RELATION_OUTPUT
                },
                {
                    id: "0600DC82-3103-426A-B0C0-F8C35BAA46FF",
                    name: '',
                    type: CONNECTOR_TYPE.RELATION_INPUT
                }
            ],
            category: ''
        },
        {
            id: 6,
            name: "Some location",
            label: null,
            icon: ICON_TYPE.LOCATION_ICON,          
            type: NODE_TYPE.LOCATION,
            connectors: [
                {
                    id: "7D3E3CCC-96C1-4A26-ABEC-1F0D74ED871D",
                    name: '',
                    type: CONNECTOR_TYPE.PARTOF_INPUT
                },
                {
                    id: "7F54F459-76E9-4DAC-B0A3-97C63BE7E91E",
                    name: '',
                    type: CONNECTOR_TYPE.PARTOF_OUTPUT
                },
                {
                    id: "44BF8E99-1D48-4D98-85A1-4C7D595985F3",
                    name: '',
                    type: CONNECTOR_TYPE.RELATION_INPUT
                }
            ],
            category: ''
        },
        {
            id: 7,
            name: "Fulla",
            label: null,
            icon: ICON_TYPE.FUNCTION_ICON,          
            type: NODE_TYPE.FUNCTION,
            connectors: [
                {
                    id: "06BC34CD-A847-4DA8-8D71-DD4DDA223265",
                    name: '',
                    type: CONNECTOR_TYPE.PARTOF_INPUT
                },
                {
                    id: "38312A9D-968D-4A2D-9AFD-C87EAE72E9EF",
                    name: '',
                    type: CONNECTOR_TYPE.PARTOF_OUTPUT
                },
                {
                    id: "5A4E3C29-1270-4F28-A0B3-434B973408F9",
                    name: '',
                    type: CONNECTOR_TYPE.RELATION_OUTPUT
                }
            ],
            category: ''
        },
      ];

      setInterval(() => {
        resolve(dataset);
      }, 300);
    });
  }
}

