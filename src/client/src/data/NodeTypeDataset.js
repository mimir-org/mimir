export default class NodeTypeDataset {
    static getAll() {
        return new Promise(resolve => {
            let dataset = [
                {
                    id: 1,
                    name: "Reidar",
                    color: "rgb(0,192,255)"
                },
                {
                    id: 2,
                    name: "Reidar 2",
                    color: "rgb(0,192,255)"     
                }
            ];

            setInterval(() => {
                resolve(dataset);
            }, 2000)
        })
    }
}
