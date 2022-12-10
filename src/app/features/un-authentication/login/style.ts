import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@theme';

export const useLoginStyle = () => {
    // state
    const theme = useTheme();

    // result
    return useMemo(
        () =>
            StyleSheet.create({
                text: {
                    color: theme.colors.text,
                },
                login_container: {
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    padding: 20,
                },
            }),
        [theme.colors.text]
    );
};
