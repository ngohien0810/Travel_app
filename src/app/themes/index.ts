import { Dimensions } from 'react-native';

import { Theme, useTheme as useThemeRN } from '@react-navigation/native';
import { ColorDark, ColorDefault } from '@theme/color';

export const WIDTH_SCREEN = Dimensions.get('screen').width;
export const HEIGHT_SCREEN = Dimensions.get('screen').height;

type ColorDefault = typeof ColorDefault;
type ColorDark = typeof ColorDark;

export type Colors = ColorDefault & ColorDark;
export type AppTheme = Theme & { colors: Colors };

const Default: AppTheme = {
    dark: false,
    colors: ColorDefault,
};
const Dark: AppTheme = {
    dark: true,
    colors: ColorDark,
};
export const MyAppTheme = {
    default: Default,
    dark: Dark,
};

export type ThemeType = keyof typeof MyAppTheme;

export const useTheme = () => {
    const payload = useThemeRN() as AppTheme;
    return payload;
};
export const SPACING = [0, 4, 8, 12, 16, 24, 32, 48, 64];
