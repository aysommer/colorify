type RGB = {
    red: number;
    green: number;
    blue: number;
}

type HSL = {
    hue: number;
    saturation: number;
    lightness: number
}

type HEX = string;

export default class colorParser {

    /**
     * Convert RGB color to HEX color.
     */
    static rgbToHex = (color: RGB): HEX => {
        const { red, green, blue }: RGB = color;
        const HEXColor: HEX = ((red << 16) | (green << 8) | blue).toString(16);

        return HEXColor;
    }

    /**
     * Convert RGB color to HSL color.
     */
    static rgbToHSL = (color: RGB): HSL => {
        let { red, green, blue }: RGB = color;

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
     * Get colors from canvas context.
     */
    static getColors = (context: CanvasRenderingContext2D): Promise<any> => {
        return new Promise((resolve) => {
            const WIDTH = 300;
            const HEIGHT = 150;

            let colors: any = {};

            // Getting colors.
            for (let x = 0; x < WIDTH; x++) {
                for (let y = 0; y < HEIGHT; y++) {
                    const pixel: any = context.getImageData(x, y, 1, 1).data;
                    const [red, green, blue] = pixel;
                    const color = { red, green, blue }

                    const HEX = "#" + ("000000" + colorParser.rgbToHex(color)).slice(-6);
                    const HSL = colorParser.rgbToHSL(color);

                    colors[HEX] = {
                        amount: colors[HEX] ? colors[HEX].amount + 1 : 1,
                        HSL
                    }
                }
            }

            // Getting structure of colors array and sorting.
            let mainColors = Object.keys(colors).map(color => {
                return {
                    HEX: color,
                    ...colors[color]
                }
            }).sort((a, b) => {
                return a.amount - b.amount
            }).reverse();

            // Deleting of excesses values.
            mainColors.forEach(color => {
                const { hue, lightness }: HSL = color.HSL;

                mainColors = mainColors.filter((_color) => {
                    const { hue: _hue, lightness: _lightness }: HSL = _color.HSL

                    if (_lightness > lightness || _lightness < lightness) {
                        return _color;
                    }

                    if (_hue > hue - 10 && _hue < hue + 10 && _color !== color) {
                        return null;
                    }

                    return _color;
                });
            })

            resolve(mainColors.splice(0, 25));
        })
    }
}