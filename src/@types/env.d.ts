declare namespace NodeJS {
	export interface ProcessEnv {
		MONGODB_URL: string;
		PORT: string;
		MODE: string;
		JWT_SECRET: string;
	}
}
