import React, { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import { Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';

import { execFunc } from '@common';
import { Block, Button, Divider, Modal } from '@components';
import { styles } from '@components/action-sheet/styles';

export const DetailOrder = forwardRef((props: any, ref) => {
    // state
    const [t] = useTranslation();
    const {
        title,
        rootStyle,
        onPressCancel,
        wrapCancelStyle,
        textOptionStyle,
        wrapOptionStyle,
        onBackDropPress: onBackDropPressOverwrite,
        textCancelStyle: textCancelStyleOverwrite,
        onPressOption,
        textCancel = t('dialog:cancel'),
        backDropColor = 'rgba(0,0,0,.5)',
        closeOnBackDropPress = true,
        children,
    } = props;
    const [actionVisible, setActionVisible] = useState(false);

    useImperativeHandle(
        ref,
        () => ({
            show: () => {
                setActionVisible(true);
            },
            hide: () => {
                setActionVisible(false);
            },
        }),
        []
    );
    // function
    const onPress = useCallback(
        (item: any, index: number) => {
            return () => {
                setActionVisible(false);
                onPressOption && onPressOption(item, index);
            };
        },
        [onPressOption]
    );

    const onCancel = useCallback(() => {
        onPressCancel && onPressCancel();
        setActionVisible(false);
    }, [onPressCancel]);

    const onBackDropPress = useCallback(() => {
        execFunc(onBackDropPressOverwrite);
        if (closeOnBackDropPress) {
            setActionVisible(false);
        }
    }, [closeOnBackDropPress, onBackDropPressOverwrite]);

    // render
    return (
        <Modal
            style={[styles.modal]}
            hasGesture={false}
            backdropOpacity={1}
            animatedIn={'slideInUp'}
            animatedOut={'slideOutDown'}
            onBackdropPress={onBackDropPress}
            onBackButtonPress={onCancel}
            isVisible={actionVisible}
            backdropColor={backDropColor}
        >
            <View style={[styles.wrap, rootStyle]}>
                <View style={[styles.wrapOption, wrapOptionStyle]}>
                    {title &&
                        (React.isValidElement(title) ? (
                            title
                        ) : (
                            <>
                                <Block style={[styles.wrapTitle]}>
                                    <Text style={[styles.title]} children={title + ''} />
                                </Block>
                                <Divider />
                            </>
                        ))}
                    {children}
                </View>
                <View style={[styles.wrapCancel, wrapCancelStyle]}>
                    <Button onPress={onCancel}>
                        <View style={[styles.wrapTextCancel]}>
                            <Text
                                style={[styles.textCancel, textCancelStyleOverwrite, { fontWeight: '600' }]}
                                children="Đóng"
                            />
                        </View>
                    </Button>
                </View>
            </View>
        </Modal>
    );
});

export interface ActionSheet {
    show(): void;
    hide(): void;
}
