declare namespace NodeJS {
	export interface ProcessEnv {
		MONGODB_URL: string;
		JWT_SECRET: string;
		SWAGGER_USER: string;
		SWAGGER_PASSWORD: string;
		PORT: string;
		NODE_ENV: 'development' | 'production';
	}
}
