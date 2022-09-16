import type { Dispatch } from "react";

export type RGB = {
   red: number;
   green: number;
   blue: number;
}
export type HSL = {
   hue: number;
   saturation: number;
   lightness: number
}
export type HEX = string;
export type Color = {
   HEX?: HEX;
   HSL: HSL;
   amount: number;
};

export type Context = {
   state: State;
   dispatch: Dispatch<Action>;
};
export type State = {
   image: HTMLImageElement | null;
   colors: Color[];
};

export type BaseAction<T, P> = {
   type: T;
   payload: P;
};
export type UploadImageAction = BaseAction<'UPLOAD_IMAGE', State['image']>;
export type CalculateColorsAction = BaseAction<'CALCULATE_COLORS', State['colors']>;
export type ClearImage = BaseAction<'CLEAR_IMAGE', undefined>;
export type Action =
   UploadImageAction |
   CalculateColorsAction |
   ClearImage;