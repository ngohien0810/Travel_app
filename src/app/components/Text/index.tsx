import * as React from 'react';
import { Text as ReactNativeText } from 'react-native';

import { presets } from './Text.presets';
import { TextProps } from './Text.props';
import sizes from './Text.size';

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
function TextComponent(props: TextProps) {
    // grab the props
    const { preset = 'default', size = 'md', text, children, style: styleOverride, color, textAlign, ...rest } = props;

    // figure out which content to use
    const content = text || children;

    const style = presets[preset] || presets.default;
    const textSize = sizes[size];
    const styles: any = [style, styleOverride, textSize, color && { color }, textAlign && { textAlign }];

    return (
        <ReactNativeText {...rest} style={styles}>
            {content}
        </ReactNativeText>
    );
}

export const Text = React.memo(TextComponent);
