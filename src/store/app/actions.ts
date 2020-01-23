import IAction from "../interfaces";

export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const CALCULATE_COLORS = 'CALCULATE_COLORS';
export const CLEAR_IMAGE = 'CLEAR_IMAGE';

export const uploadImage = (image: ImageBitmap): IAction => ({
    type: UPLOAD_IMAGE,
    payload: image
});

export const calculateColors = (image: ImageBitmap): IAction => ({
    type: CALCULATE_COLORS,
    payload: image
})

export const clearImage = (): IAction => ({
    type: CLEAR_IMAGE
});