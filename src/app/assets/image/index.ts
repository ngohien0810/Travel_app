export const images = {
    bg_wallpaper: require('./source/bg.png'),
    default: require('./source/default.png'),
    header_home_bg: require('./source/header_home_bg.png'),
    tour_image: require('./source/tour_image.png'),
    slide: require('./source/slide.png'),
    home: require('./source/home.png'),
    tour: require('./source/tour.png'),
    favorite: require('./source/favorite.png'),
    user: require('./source/user.png'),
    clock: require('./source/clock.png'),
    calendar: require('./source/calendar.png'),
    location_login: require('./source/location_login.png'),
    header_gradient_bg: require('./source/header_gradient_bg.png'),
};

export type ImageTypes = keyof typeof images;
