import { HttpResponse, BadRequestData } from '.';
import { BadRequestDataItem } from './types';


const GetBadResponseData = (response: HttpResponse<any>): BadRequestData => {
    if (response.status !== 400)
        return null;

    var data = {
        title: response.data.title,
        items: []
    } as BadRequestData;

    for (const [key, value] of Object.entries(response.data)) {
        const item = { key, value } as BadRequestDataItem
        data.items.push(item);
    }

    return data;
}

export default GetBadResponseData;
