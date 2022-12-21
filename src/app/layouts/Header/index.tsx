import React from 'react';
import { Platform, TextStyle, View, ViewStyle } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HeaderProps } from './header.props';
import { goBack } from '@navigation/navigation-service';
import { Button } from '../../components/Button';
import { Icon, Text } from '@components';
import { SPACING } from '@theme';
import { ColorDefault } from '@theme/color';

// static styles
const ROOT: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: SPACING[3],
    justifyContent: 'flex-start',
    backgroundColor: ColorDefault.card,
    position: 'relative',
    paddingHorizontal: 14,
};
const TITLE: TextStyle = { textAlign: 'left' };
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: 'center' };
const LEFT: ViewStyle = { width: 2 };
const RIGHT: ViewStyle = { width: 2 };

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
const Header = (props: HeaderProps) => {
    const {
        iconLeft = '#fff',
        leftIconStyled,
        rightIconStyled,
        onRightPress,
        rightIcon,
        leftIcon,
        headerText,
        style,
        titleStyle,
        onBack,
        children,
        iconLeftSize = 40,
    } = props;
    const header = headerText || '';
    const insets = useSafeAreaInsets();

    return (
        <View style={[ROOT, { paddingTop: SPACING[3] + (Platform.OS === 'ios' ? insets.top : 0) }, style]}>
            {leftIcon ? (
                <Button
                    preset="link"
                    onPress={() => {
                        onBack && onBack();
                        goBack();
                    }}
                    style={leftIconStyled}
                >
                    <Icon icon="arrow_down" size={iconLeftSize} rotate color={iconLeft} />
                </Button>
            ) : (
                <View style={LEFT} />
            )}

            <View style={TITLE_MIDDLE}>{children ? children : <Text style={[TITLE, titleStyle]} text={header} />}</View>

            {rightIcon ? (
                <Button style={rightIconStyled} preset="link" onPress={onRightPress}>
                    <Icon size={35} icon={rightIcon} />
                </Button>
            ) : (
                <View style={RIGHT} />
            )}
        </View>
    );
};

export default React.memo(Header);
