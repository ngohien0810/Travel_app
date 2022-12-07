import React from 'react';
import { StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';
import { ButtonPresetNames } from './Button.Presets';

export interface ButtonProps extends TouchableOpacityProps {
    /**
     * Text which is looked up via i18n.
     */
    tx?: string;

    /**
     * The text to display if not using `tx` or nested components.
     */
    text?: string;

    /**
     * An optional style override useful for padding & margin.
     */
    style?: StyleProp<ViewStyle>;

    /**
     * An optional style override useful for the button text.
     */
    textStyle?: StyleProp<TextStyle>;

    /**
     * One of the different types of text presets.
     */
    preset?: ButtonPresetNames;

    /**
     * One of the different types of text presets.
     */
    children?: React.ReactNode;
}
