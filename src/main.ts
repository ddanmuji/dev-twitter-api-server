import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const globalPrefix = 'api' as const;
	const port = process.env.PORT || 3333;

	app.setGlobalPrefix(globalPrefix);
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(port);
	Logger.log(`🚀 어플리케이션을 시작합니다... URL: http://localhost:${port}/api`);
}

bootstrap();
