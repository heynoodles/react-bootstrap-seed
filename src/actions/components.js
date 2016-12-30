import {componentsActionType} from '../constants/actionType/components';

export const setLoad = data => {
    return {
        type: componentsActionType.load,
        data: data
    };
};

export const setData = (path, data) => {
    return {
        type: componentsActionType.setData,
        data: data,
        path: path
    }
}
