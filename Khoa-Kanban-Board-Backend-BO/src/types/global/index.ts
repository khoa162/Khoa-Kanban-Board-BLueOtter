
declare global { 
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string,
            APP_NAME: string,
            APP_VERSION: string,
            APP_SID: string,
            MAX_AGE: string,
            DATABASE_ENDPOINT: string,
            API_PORT: string,
            SIGNATURE: string,
            SESSION_SECRET: string,
            JWT_SECRET: string,
            Version: string,
            PROJECT1_DATABASE_ENDPOINT: string
        }
        let appName: string
    }
}
export {};
