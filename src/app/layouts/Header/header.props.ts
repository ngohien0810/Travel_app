import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { IconTypes } from '@assets/icon';

export interface HeaderProps {
    /**
     * Main header, e.g. POWERED BY IGNITE
     */

    /**
     * header non-i18n
     */
    headerText?: string;

    /**
     * Icon that should appear on the left
     */
    leftIcon?: IconTypes | boolean;

    /**
     * What happens when you press the left icon
     */
    onLeftPress?(): void;

    /**
     * Icon that should appear on the right
     */
    rightIcon?: IconTypes;

    /**
     * What happens when you press the right icon
     */
    onRightPress?(): void;

    /**
     * Container style overrides.
     */
    style?: StyleProp<ViewStyle>;

    /**
     * Title style overrides.
     */
    titleStyle?: StyleProp<TextStyle>;
    onBack?: any;

    children?: any;
    leftIconStyled?: any;
    rightIconStyled?: any;
    iconLeft?: any;
    iconLeftSize?: any;
}
