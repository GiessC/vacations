/* eslint-disable no-unused-vars */
enum RoutePath {
    ROOT = '/',
    LOGIN = '/auth/login',
    CONFIRM_NEW_PASSWORD = '/auth/confirm-new-password',
    AUTH = '/auth',
    ALBUM = '/albums/:albumSlug/:albumId',
}

export default RoutePath;
