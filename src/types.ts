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
