import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGODB_URL)],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule implements NestModule {
	private readonly isDev: boolean = process.env.MODE === 'dev';

	configure() {
		mongoose.set('debug', this.isDev);
	}
}
