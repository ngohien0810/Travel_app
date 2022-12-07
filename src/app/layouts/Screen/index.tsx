import * as React from 'react';
import { Dimensions, KeyboardAvoidingView, Platform, RefreshControl, ScrollView, StatusBar, View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CommentLoading } from '@components';
import { ColorDefault } from '@theme/color';
import { isNonScrolling, offsets, presets } from './screen.presets';
import { ScreenProps } from './screen.props';

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: ScreenProps) {
    const insets = useSafeAreaInsets();
    const preset = presets.fixed;
    const style = props.style || {};
    const backgroundStyle = props.backgroundColor
        ? { backgroundColor: props.backgroundColor }
        : { backgroundColor: 'white' };
    const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top };

    return (
        <KeyboardAvoidingView
            style={[preset.outer, backgroundStyle]}
            behavior={isIos ? 'padding' : undefined}
            keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
        >
            <StatusBar backgroundColor={ColorDefault.card} barStyle={props.statusBar || 'dark-content'} />
            <View style={[preset.inner, style, insetStyle]}>{props.children}</View>
        </KeyboardAvoidingView>
    );
}

function ScreenWithScrolling(props: ScreenProps) {
    const insets = useSafeAreaInsets();
    const preset = presets.scroll;
    const style = props.style || {};
    const backgroundStyle = props.backgroundColor
        ? { backgroundColor: props.backgroundColor }
        : { backgroundColor: 'white' };
    const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top };
    // The followings for <Screen preset='auto'/>
    // This will automatically disables scrolling if content fits the screen.
    const { height } = Dimensions.get('window');
    const scrollViewHeight = React.useRef(null);
    const [scrollEnabled, setScrollEnabled] = React.useState(true);

    const updateScrollState = () => {
        if (props.preset === 'auto') {
            // check whether if content fits the screen
            // then toggle scroll state according to it
            const contentFitsScreen =
                scrollViewHeight?.current! < height * presets.auto.offset.percent - presets.auto.offset.point;

            // content is less than the size of the screen, so we can disable scrolling
            if (scrollEnabled && contentFitsScreen) {
                setScrollEnabled(false);
            }

            // content is greater than the size of the screen, so let's enable scrolling
            if (!scrollEnabled && !contentFitsScreen) {
                setScrollEnabled(true);
            }
        } else if (!scrollEnabled) {
            // set back initial value in case it's stucked in a disabled state
            // i.e. if we've just changed preset from 'auto' to 'scroll'
            setScrollEnabled(true);
        }
    };

    const onContentSizeChange = (contentWidth: any, contentHeight: any) => {
        // update scroll view height
        scrollViewHeight.current = contentHeight;

        // then update scroll state
        updateScrollState();
    };

    // update scroll state on every render
    // when scrollViewHeight isn't null
    if (scrollViewHeight.current !== null) {
        updateScrollState();
    }
    const scrollViewRef = React.useRef<ScrollView>(null);

    React.useEffect(() => {
        scrollViewRef.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }, [props.scrollToTop]);

    return (
        <KeyboardAvoidingView
            style={[preset.outer, backgroundStyle]}
            behavior={isIos ? 'padding' : undefined}
            keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
        >
            <StatusBar backgroundColor={ColorDefault.card} barStyle={props.statusBar || 'dark-content'} />
            <View style={[preset.outer, backgroundStyle, insetStyle]}>
                <ScrollView
                    ref={scrollViewRef}
                    style={[preset.outer, backgroundStyle]}
                    contentContainerStyle={[preset.inner, style]}
                    keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || 'handled'}
                    onContentSizeChange={props.preset === 'auto' ? onContentSizeChange : undefined}
                    scrollEnabled={scrollEnabled}
                    scrollEventThrottle={16}
                    onScroll={(e) => {
                        props.onScroll && props.onScroll(e);
                    }}
                    refreshControl={
                        props.onRefresh && <RefreshControl refreshing={props.refreshing} onRefresh={props.onRefresh} />
                    }
                    showsVerticalScrollIndicator={false}
                >
                    {props.children}
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
function Screen({ ...props }: ScreenProps) {
    return (
        <>
            {props.overlay && (
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 1,
                        backgroundColor: '#000',
                        opacity: 0.3,
                    }}
                />
            )}
            {isNonScrolling(props.preset) ? <ScreenWithoutScrolling {...props} /> : <ScreenWithScrolling {...props} />}
            {props?.dialogLoading && <CommentLoading />}
        </>
    );
    // if (isNonScrolling(props.preset)) {
    //     return <ScreenWithoutScrolling {...props} />;
    // } else {
    //     return <ScreenWithScrolling {...props} />;
    // }
}

export default React.memo(Screen);
