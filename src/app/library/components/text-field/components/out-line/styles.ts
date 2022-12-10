import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: StyleSheet.hairlineWidth * 2,
        borderColor: 'rgba(155, 155, 155, 1)',
        justifyContent: 'center',
        borderRadius: 10,
    },
    input: {
        color: '#000',
        padding: 0,
        borderBottomColor: 'transparent',
    },
    text: {
        alignSelf: 'flex-start',
        zIndex: 4,
        left: 5,
    },
    wrapLabel: {
        position: 'absolute',
        alignSelf: 'flex-end',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    wrapPlaceHolder: {
        position: 'absolute',
        alignSelf: 'flex-end',
        paddingLeft: 5,
    },
    flex: {
        flex: 1,
        paddingHorizontal: 5,
    },
});
