import { SIZES } from '@src/constants';

const BASE = {
    fontSize: SIZES.h3,
    lineHeight: 20,
};

const sizes = {
    xs: {
        fontSize: SIZES.h5,
        lineHeight: 14,
    },
    sm: {
        fontSize: SIZES.h4,
        lineHeight: 20,
    },
    md: BASE,
    lg: {
        fontSize: SIZES.h2,
        lineHeight: 24,
    },
    xl: {
        fontSize: SIZES.h1,
        lineHeight: 24,
    },
    number: {
        fontSize: 18,
        lineHeight: 22,
    },
};

export default sizes;
