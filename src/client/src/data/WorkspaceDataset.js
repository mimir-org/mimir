export default class WorkspaceDataset {
    static get() {
        return new Promise(resolve => {
            let dataset = {
                root: {
                    title: "Equinor Asset Model"
                },
                aspects: [
                    {
                        aspect: "1",
                        category: "1",
                        graph: {
                            nodes: [
                                {
                                    id: "n1",
                                    type: "imft:Reservoir"
                                },
                                {
                                    id: "n2",
                                    type: "imft:WellfluidOutput"
                                },
                                {
                                    id: "n3",
                                    type: "imfo:InputProxy"
                                },
                                {
                                    id: "n4",
                                    type: "imft:FlowSystem"
                                },
                                {
                                    id: "n5",
                                    type: "imfo:InputProxy"
                                },
                                {
                                    id: "n6",
                                    type: "imft:SatelliteFacility"
                                },
                                {
                                    id: "n7",
                                    type: "imft:WellfluidInput"
                                },
                                {
                                    id: "n8",
                                    type: "imfo:InputProxy"
                                },
                                {
                                    id: "n9",
                                    type: "imft:Pipeline"
                                },
                                {
                                    id: "n10",
                                    type: "imft:FluidInput"
                                },
                                {
                                    id: "n11",
                                    type: "imft:FluidOutput"
                                }
                            ],
                            edges: [
                                {
                                    id: "e1",
                                    type: "imfo:partOf",
                                    from: "n1",
                                    to: "root"
                                },
                                {
                                    id: "e2",
                                    type: "imfo:partOf",
                                    from: "n2",
                                    to: "n1"
                                },
                                {
                                    id: "e3",
                                    type: "imfo:partOf",
                                    from: "n3",
                                    to: "n4"
                                },
                                {
                                    id: "e4",
                                    type: "imfo:partOf",
                                    from: "n4",
                                    to: "root"
                                },
                                {
                                    id: "e5",
                                    type: "imfo:partOf",
                                    from: "n5",
                                    to: "n4"
                                },
                                {
                                    id: "e6",
                                    type: "imfo:partOf",
                                    from: "n6",
                                    to: "n4"
                                },
                                {
                                    id: "e7",
                                    type: "imfo:partOf",
                                    from: "n7",
                                    to: "n6"
                                },
                                {
                                    id: "e8",
                                    type: "imfo:partOf",
                                    from: "n8",
                                    to: "n6"
                                },
                                {
                                    id: "e9",
                                    type: "imfo:partOf",
                                    from: "n9",
                                    to: "n4"
                                },
                                {
                                    id: "e10",
                                    type: "imfo:partOf",
                                    from: "n10",
                                    to: "n9"
                                },
                                {
                                    id: "e11",
                                    type: "imfo:partOf",
                                    from: "n11",
                                    to: "n9"
                                },
                                {
                                    id: "e12",
                                    type: "imft:indirectlySupplies",
                                    from: "n1",
                                    to: "n4"
                                },
                                {
                                    id: "e13",
                                    type: "imft:supplies",
                                    from: "n1",
                                    to: "n9"
                                },
                                {
                                    id: "e14",
                                    type: "imft:supplies",
                                    from: "n9",
                                    to: "n6"
                                },
                                {
                                    id: "e15",
                                    type: "imft:consumedBy",
                                    from: "n2",
                                    to: "n10"
                                },
                                {
                                    id: "e16",
                                    type: "imft:consumedBy",
                                    from: "n10",
                                    to: "n11"
                                },
                                {
                                    id: "e17",
                                    type: "imft:consumedBy",
                                    from: "n11",
                                    to: "n7"
                                }
                            ]
                        }
                    },
                    {
                        aspect: "1",
                        category: "2",
                        graph: {
                            nodes: [
                                {
                                    id: "n4",
                                    type: "imft:ElectricalSystem"
                                },
                                {
                                    id: "n12",
                                    type: "imft:ElectricalSystem"
                                }
                            ],
                            edges: [
                                {
                                    id: "e1",
                                    type: "imfo:partOf",
                                    from: "n4",
                                    to: "root"
                                },
                                {
                                    id: "e2",
                                    type: "imfo:partOf",
                                    from: "n12",
                                    to: "root"
                                },
                                {
                                    id: "e3",
                                    type: "imfo:indirectlySupplies",
                                    from: "n12",
                                    to: "n4"
                                }
                            ]
                        }
                    },
                    {
                        aspect: "2",
                        category: "1",
                        graph: {
                            nodes: [
                                {
                                    id: "n4",
                                    type: "imft:NamedSystem",
                                    label: "NOAKA"
                                },
                                {
                                    id: "n6",
                                    type: "imft:NamedSystem",
                                    label: "Fulla"
                                }
                            ],
                            edges: [
                                {
                                    id: "e1",
                                    type: "imfo:partOf",
                                    from: "n4",
                                    to: "root"
                                },
                                {
                                    id: "e2",
                                    type: "imfo:partOf",
                                    from: "n6",
                                    to: "n4"
                                }
                            ]
                        }
                    }
                ]
            }

            setInterval(() => {
                resolve(dataset);
            }, 500)
        })
    }
}
