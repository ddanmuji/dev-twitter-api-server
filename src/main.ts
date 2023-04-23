import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const GLOBAL_PREFIX = 'api' as const;
	const SWAGGER_PATH = '/api-docs' as const;
	const PORT = process.env.PORT || 3333;
	const basicAuth = {
		users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
		challenge: true
	};

	app.setGlobalPrefix(GLOBAL_PREFIX);
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({ origin: true, credentials: true });
	app.use(SWAGGER_PATH, expressBasicAuth(basicAuth));

	const config = new DocumentBuilder()
		.setTitle('dev-twitter')
		.setDescription('dev twitter API description')
		.setVersion('1.0.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup(SWAGGER_PATH, app, document);

	await app.listen(PORT);
	Logger.log(`🚀 어플리케이션을 시작합니다 http://localhost:${PORT}/${GLOBAL_PREFIX}`);
	Logger.log(`🗂️  Swagger API 문서 http://localhost:${PORT}${SWAGGER_PATH}`);
}

bootstrap();
