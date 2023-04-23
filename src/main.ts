import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const GLOBAL_PREFIX = 'api' as const;
	const PORT = process.env.PORT || 3333;

	app.setGlobalPrefix(GLOBAL_PREFIX);
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors({ origin: true, credentials: true });

	const config = new DocumentBuilder()
		.setTitle('dev-twitter')
		.setDescription('dev twitter API description')
		.setVersion('1.0.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('docs', app, document);

	await app.listen(PORT);
	Logger.log(`🚀 어플리케이션을 시작합니다 http://localhost:${PORT}/api`);
	Logger.log(`🗂️  Swagger API 문서 http://localhost:${PORT}/docs`);
}

bootstrap();
