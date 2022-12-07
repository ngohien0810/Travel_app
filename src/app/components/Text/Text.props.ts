import React from 'react';
import { StyleProp, TextProps as TextProperties, TextStyle } from 'react-native';

import { TextPresets } from './Text.presets';

export interface TextProps extends TextProperties {
    /**
     * Children components.
     */
    children?: React.ReactNode;

    /**
     * Text which is looked up via i18n.
     */

    // size
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'number';

    /**
     * Optional options to pass to i18n. Useful for interpolation
     * as well as explicitly setting locale or translation fallbacks.
     */

    /**
     * The text to display if not using `tx` or nested components.
     */
    text?: string;

    /**
     * An optional style override useful for padding & margin.
     */
    style?: StyleProp<TextStyle>;

    /**
     * One of the different types of text presets.
     */
    preset?: TextPresets;
    color?: string;
    textAlign?: 'left' | 'center' | 'right' | 'justify' | undefined;
}
