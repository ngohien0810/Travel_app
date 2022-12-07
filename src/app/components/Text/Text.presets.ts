import { COLORS, FONTS } from '@src/constants';
import { TextStyle } from 'react-native';

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
    ...FONTS.h3,
    fontWeight: '500',
    color: COLORS.dark,
};
const BASE_REGULAR: TextStyle = {
    ...FONTS.body3,
    color: COLORS.dark,
};

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets = {
    /**
     * The default text styles.
     */
    default: BASE,

    // regular base

    regular: BASE_REGULAR,

    /**
     * A bold version of the default text.
     */
    bold: { ...BASE, fontWeight: 'bold' } as TextStyle,

    /**
     * A text danger.
     */
    danger: { ...BASE_REGULAR, color: COLORS.tabActive } as TextStyle,

    /**
     * A bold text danger.
     */
    dangerBold: { ...BASE, fontWeight: 'bold', color: COLORS.tabActive } as TextStyle,

    /**
     * A bold text info.
     */
    info: { ...BASE, fontWeight: '600' } as TextStyle,
    /**
     * Large headers.
     */
    header: { ...BASE, fontSize: 24, fontWeight: 'bold' } as TextStyle,

    // /**
    //  * Field labels that appear on forms above the inputs.
    //  */
    // fieldLabel: { ...BASE, fontSize: 13, color: color.dim } as TextStyle,

    // /**
    //  * A smaller piece of secondary information.
    //  */
    // secondary: { ...BASE, fontSize: 9, color: color.dim } as TextStyle,
};

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets;
