import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import log from './logger';

class EnvVar {
    private static instance?: EnvVar = undefined;

    private constructor() {
        // load the environment variables from the .env file
        const envPath = path.join(__dirname, '..', '..', '..', '.env');

        if (!fs.existsSync(envPath)) {
            // If the .env file does not exist, log a warning message
            log.warn(`.env file not found at ${envPath}. Please make sure all the required environment variables are present in the system environment variable list.`);
            dotenv.config();
        }
        else {
            log.info(`Loading environment variables from ${envPath}`);
            dotenv.config({ path: envPath });
        }
    }

    static get Instance(): EnvVar {
        if (!EnvVar.instance) {
            EnvVar.instance = new EnvVar();
        }

        return EnvVar.instance;
    }

    public get(key: string): string {
        const value = process.env[key];

        if (!value) {
            log.warn(`Environment variable ${key} not found`);
        }

        return value;
    }
}

export default EnvVar;