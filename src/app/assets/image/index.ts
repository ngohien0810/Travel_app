export const images = {
    bg_wallpaper: require('./source/bg.png'),
    default: require('./source/default.png'),
    header_home_bg: require('./source/header_home_bg.png'),
    tour_image: require('./source/tour_image.png'),
    slide: require('./source/slide.png'),
};

export type ImageTypes = keyof typeof images;
