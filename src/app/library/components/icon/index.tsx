import React, { useMemo } from 'react';
import { StyleProp, TouchableOpacity } from 'react-native';

import FastImage, { ImageStyle } from 'react-native-fast-image';

import { icons } from '@assets/icon';
import { useTheme } from '@theme';

import { IconProps } from './type';

const SIZE = 40;

export const Icon = ({ icon, color, colorTheme, onPress, size = SIZE, resizeMode = 'contain', rotate }: IconProps) => {
    // state

    const theme = useTheme();
    // style
    const style = useMemo<StyleProp<ImageStyle>>(
        () => [{ width: size, height: size, transform: rotate ? [{ rotate: '90deg' }] : [] }],
        [size, rotate]
    );

    // render
    return (
        <TouchableOpacity disabled={typeof onPress !== 'function'} onPress={onPress}>
            <FastImage
                style={style}
                tintColor={colorTheme ? theme.colors[colorTheme] : color}
                resizeMode={resizeMode}
                source={icons[icon]}
            />
        </TouchableOpacity>
    );
};
