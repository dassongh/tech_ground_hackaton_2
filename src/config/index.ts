export const BASE_URL = String(process.env.BASE_URL);
export const NODE_ENV = String(process.env.NODE_ENV);
export const PORT = Number(process.env.PORT);

export const POSTGRES_HOST = String(process.env.POSTGRES_HOST);
export const POSTGRES_PORT = Number(process.env.POSTGRES_PORT);
export const POSTGRES_USER = String(process.env.POSTGRES_USER);
export const POSTGRES_PASSWORD = String(process.env.POSTGRES_PASSWORD);
export const POSTGRES_DB = String(process.env.POSTGRES_DB);

export const PASSWORD_SALT = 'awesome-salt';
export const ACCESS_TOKEN_SALT = 'awesome-salt';
export const REFRESH_TOKEN_SALT = 'awesome-salt';
export const ACCESS_TOKEN_EXPIRE = 86400;
export const REFRESH_TOKEN_EXPIRE = 2630000;
export const ACCESS_TOKEN_COOKIE_MAX_AGE = 86400000;
export const REFRESH_TOKEN_COOKIE_MAX_AGE = 2592000000;
