import * as React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { viewPresets, textPresets } from './Button.Presets';
import { ButtonProps } from './Button.Props';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
    // grab the props
    const { preset = 'primary', text, style: styleOverride, textStyle: textStyleOverride, children, ...rest } = props;

    const viewStyle = viewPresets[preset] || viewPresets.primary;
    const viewStyles = [viewStyle, styleOverride];
    const textStyle = textPresets[preset] || textPresets.primary;
    const textStyles = [textStyle, textStyleOverride];

    const content = children || <Text style={textStyles}>{text}</Text>;

    return (
        <TouchableOpacity style={viewStyles} {...rest}>
            {content}
        </TouchableOpacity>
    );
}
