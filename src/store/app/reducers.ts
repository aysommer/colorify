import IAction from "../interfaces";

import { 
    UPLOAD_IMAGE,
    CLEAR_IMAGE,
    CALCULATE_COLORS
 } from "./actions";

const initialState = {
    image: null,
    colors: []
}

export const appReducer = (state = initialState, action: IAction) => {
    switch (action.type) {
        case UPLOAD_IMAGE: {
            return {
                ...state,
                image: action.payload
            }
        }
        case CALCULATE_COLORS: {
            return {
                ...state,
                colors: action.payload
            }
        }
        case CLEAR_IMAGE: {
            return {
                ...initialState
            }
        }
    }

    return state;
}