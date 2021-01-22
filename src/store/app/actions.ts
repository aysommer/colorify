import { IAction } from '../../common/interfaces';

export enum COLORIFY_ACTIONS {
    UPLOAD_IMAGE = 'UPLOAD_IMAGE',
    CALCULATE_COLORS = 'CALCULATE_COLORS',
    CLEAR_IMAGE = 'CLEAR_IMAGE'
}

export const uploadImage = (image: ImageBitmap): IAction<COLORIFY_ACTIONS.UPLOAD_IMAGE> => ({
    type: COLORIFY_ACTIONS.UPLOAD_IMAGE,
    payload: image
});

export const calculateColors = (image: ImageBitmap): IAction<COLORIFY_ACTIONS.CALCULATE_COLORS> => ({
    type: COLORIFY_ACTIONS.CALCULATE_COLORS,
    payload: image
})

export const clearImage = (): IAction<COLORIFY_ACTIONS.CLEAR_IMAGE> => ({
    type: COLORIFY_ACTIONS.CLEAR_IMAGE
});