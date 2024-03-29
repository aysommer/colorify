import type { Color, RGB, HSL } from "./types";

const MAX_COLORS = 25;
const COLOR_ARR_SIZE = 4;

type OnMessageData = {
   data: {
      data: number[];
   }
}

/**
 * Converts RGB color to HEX color.
 */
const rgbToHex = (color: RGB): string => {
   const { red, green, blue } = color;
   const HEXColor = ((red << 16) | (green << 8) | blue).toString(16);

   return HEXColor;
}

/**
 * Converts RGB color to HSL color.
 */
const rgbToHSL = (color: RGB): HSL => {
   let { red, green, blue } = color;

   red /= 255;
   green /= 255;
   blue /= 255;

   let cmin = Math.min(red, green, blue),
      cmax = Math.max(red, green, blue),
      delta = cmax - cmin,
      hue = 0,
      saturation = 0,
      lightness = 0;

   if (delta === 0) {
      hue = 0;
   } else if (cmax === red) {
      hue = ((green - blue) / delta) % 6;
   } else if (cmax === green) {
      hue = (blue - red) / delta + 2;
   } else {
      hue = (red - green) / delta + 4;
   }

   hue = Math.round(hue * 60);

   if (hue < 0) {
      hue += 360;
   }

   lightness = (cmax + cmin) / 2;

   saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

   saturation = +(saturation * 100).toFixed(1);
   lightness = +(lightness * 100).toFixed(1);

   const HSLColor: HSL = {
      hue,
      saturation,
      lightness
   };

   return HSLColor;
}

/**
 * Gets colors from canvas context.
 */
const getColors = ({ data }: OnMessageData['data']): Color[] => {
   let colors: Record<string, Color> = {};

   // Getting colors.
   for (let x = 0; x < data.length; x += COLOR_ARR_SIZE) {
      const color = {
         red: data[x],
         green: data[x + 1],
         blue: data[x + 2]
      };

      const HEX = "#" + ("000000" + rgbToHex(color)).slice(-6);
      const HSL = rgbToHSL(color);

      colors[HEX] = {
         amount: colors[HEX] ? colors[HEX].amount + 1 : 1,
         HSL
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
   mainColors.forEach(color => {
      const { hue, lightness } = color.HSL;

      mainColors = mainColors.filter((_color) => {
         const { hue: _hue, lightness: _lightness } = _color.HSL

         if (_lightness > lightness || _lightness < lightness) {
            return _color;
         }

         if (_hue > hue - 10 && _hue < hue + 10 && _color !== color) {
            return null;
         }

         return _color;
      });
   })

   return mainColors.splice(0, MAX_COLORS);
}

onmessage = ({ data }: OnMessageData) => {
   const colors = getColors(data);
   postMessage(colors);
}