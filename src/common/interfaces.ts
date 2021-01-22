export interface IAction<T> {
    type: T;
    payload?: unknown;
}

export interface IColor {
    HEX: string;
    HSL: {
        hue: number;
        saturation: number;
        lightness: number;
    }
    amount: number;
}