import Immutable from 'immutable';
import {componentsActionType} from '../constants/actionType/components';

const initialState = Immutable.fromJS({
    "name": "hello",
    "date": "2016-12"
});

const componentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case componentsActionType.load:
            return state.merge(Immutable.fromJS({'name': action.data}));
        case componentsActionType.setData:
            return state.setIn(action.path, action.data);
        default:
            return state;
    }
};

export default componentsReducer;