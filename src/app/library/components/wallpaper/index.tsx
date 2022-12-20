import React, { memo, useMemo } from 'react';
import { Dimensions, useWindowDimensions, View, ViewStyle } from 'react-native';

import equals from 'react-fast-compare';

import { styles } from './styles';
import { WallpaperProps } from './type';

import { LocalImage } from '../local-image';

const deviceH = Dimensions.get('screen').height;

const WallpaperComponent = ({ backgroundImage = 'bg_wallpaper', deviceH50 }: WallpaperProps) => {
    // state
    const { width } = useWindowDimensions();
    const containerStyle = useMemo<ViewStyle>(
        () => ({ width, height: deviceH50 ? deviceH / 2 : deviceH }),
        [width, deviceH50]
    );

    // render
    return (
        <View pointerEvents={'none'} style={[styles.container, containerStyle]}>
            <LocalImage source={backgroundImage} />
        </View>
    );
};
export const Wallpaper = memo(WallpaperComponent, equals);
