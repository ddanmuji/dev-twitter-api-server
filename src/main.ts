import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import * as path from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const API_PREFIX = 'api' as const;
	const API_DOC_PATH = '/api-docs' as const;
	const API_MEDIA_PATH = '/media' as const;
	const PORT = process.env.PORT || 3333;
	const basicAuth = {
		users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
		challenge: true
	};

	app.setGlobalPrefix(API_PREFIX);
	app.useGlobalPipes(new ValidationPipe());
	app.useStaticAssets(path.join(__dirname, './shared', 'uploads'), { prefix: API_MEDIA_PATH });
	app.enableCors({ origin: true, credentials: true });
	app.use(API_DOC_PATH, expressBasicAuth(basicAuth));

	const config = new DocumentBuilder()
		.setTitle('dev-twitter')
		.setDescription('dev twitter API description')
		.setVersion('1.0.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(API_DOC_PATH, app, document);

	await app.listen(PORT);
	Logger.log(`📄 Swagger 문서 경로 http://localhost:${PORT}${API_DOC_PATH}`);
	Logger.log(`📂 미디어 파일 경로 http://localhost:${PORT}${API_MEDIA_PATH}`);
	Logger.log(`🚀 어플리케이션을 시작합니다 http://localhost:${PORT}/${API_PREFIX}`);
}

bootstrap();
