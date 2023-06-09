import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './domains/auth/auth.module';
import { TweetsModule } from './domains/tweets/tweets.module';
import { UsersModule } from './domains/users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGODB_URL),
		AuthModule,
		TweetsModule,
		UsersModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule implements NestModule {
	private readonly isDevelopment: boolean = process.env.NODE_ENV === 'development';

	configure() {
		mongoose.set('debug', this.isDevelopment);
	}
}
