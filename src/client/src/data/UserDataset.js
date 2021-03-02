import { SETTING_KEY, SETTING_VALUE } from '../models/user';

export default class NodeTypeDataset {
    static getAll() {
        return new Promise(resolve => {
            let dataset = [
                {
                    id: 1,
                    username: "as",
                    name: "Arisa Seljestokken",
                    settings: new Map([
                        [SETTING_KEY.PREFERED_TYPE, SETTING_VALUE.TREE_VIEW]
                    ])
                },
                {
                    id: 2,
                    username: "rl",
                    name: "Reidar Liabø",
                    settings: new Map([
                        [SETTING_KEY.PREFERED_TYPE, SETTING_VALUE.DIAGRAM_VIEW]
                    ])                
                }  
            ];

            setInterval(() => {
                resolve(dataset);
            }, 50)
        })
    }
}

