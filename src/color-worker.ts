import type { Color, RGB, HEX } from "./types";

const MAX_COLORS = 25;
const COLOR_ARR_SIZE = 4;
const SIMILARITY_THRESHOLD = 0.8;

type OnMessageData = {
   data: {
      data: number[];
   }
};

/**
 * Converts RGB color to HEX color.
 */
const rgbToHex = (color: RGB): HEX => {
   const { red, green, blue } = color;
   const HEXColor = ((red << 16) | (green << 8) | blue).toString(16);

   return HEXColor;
}

const getHEXColorDelta = (hex1: HEX, hex2: HEX): number => {
   // get red/green/blue int values of hex1
   const r1 = parseInt(hex1.substring(0, 2), 16);
   const g1 = parseInt(hex1.substring(2, 4), 16);
   const b1 = parseInt(hex1.substring(4, 6), 16);
   // get red/green/blue int values of hex2
   const r2 = parseInt(hex2.substring(0, 2), 16);
   const g2 = parseInt(hex2.substring(2, 4), 16);
   const b2 = parseInt(hex2.substring(4, 6), 16);
   // calculate differences between reds, greens and blues
   let r = 255 - Math.abs(r1 - r2);
   let g = 255 - Math.abs(g1 - g2);
   let b = 255 - Math.abs(b1 - b2);
   // limit differences between 0 and 1
   r /= 255;
   g /= 255;
   b /= 255;
   // 0 means opposite colors, 1 means same colors
   return (r + g + b) / 3;
}

/**
 * Gets colors from canvas context.
 */
const getColors = ({ data }: OnMessageData['data']): Color[] => {
   let colors: Record<HEX, Color> = {};

   // Getting colors.
   for (let x = 0; x < data.length; x += COLOR_ARR_SIZE) {
      const color = {
         red: data[x],
         green: data[x + 1],
         blue: data[x + 2]
      };

      const HEX = "#" + ("000000" + rgbToHex(color)).slice(-6);

      colors[HEX] = {
         amount: colors[HEX] ? colors[HEX].amount + 1 : 1
      }
   }

   // Getting structure of colors array and sorting.
   let mainColors = Object.keys(colors)
      .map(color => ({
         HEX: color,
         ...colors[color]
      }))
      .sort((a, b) => a.amount - b.amount)
      .reverse();

   // Deleting of excesses values.
   mainColors.forEach((color) => {
      mainColors = mainColors.filter((_color) =>
         color.HEX === _color.HEX ||
         getHEXColorDelta(color.HEX.slice(1), _color.HEX.slice(1)) < SIMILARITY_THRESHOLD
      );
   })


   return mainColors.splice(0, MAX_COLORS);
}

onmessage = ({ data }: OnMessageData) => {
   const colors = getColors(data);
   postMessage(colors);
}