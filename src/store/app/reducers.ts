import { IAction, IColor } from '../../common/interfaces'
import { COLORIFY_ACTIONS } from './actions'

interface IInitialState {
    image: null;
    colors: IColor[]
}

const initialState: IInitialState = {
    image: null,
    colors: []
}

export const appReducer: any = (state: IInitialState = initialState, action: IAction<COLORIFY_ACTIONS>) => {
    switch (action.type) {
        case COLORIFY_ACTIONS.UPLOAD_IMAGE: {
            return {
                ...state,
                image: action.payload
            }
        }
        case COLORIFY_ACTIONS.CALCULATE_COLORS: {
            return {
                ...state,
                colors: action.payload
            }
        }
        case COLORIFY_ACTIONS.CLEAR_IMAGE: {
            return {
                ...initialState
            }
        }
        default: {
            return state;
        }
    }
}