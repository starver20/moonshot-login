/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
    env: {
        RESEND_API_KEY:'re_8CAzfhfQ_KXD8bRFwDYpcj9wikHSZeWGh',
    }
};

export default config;
