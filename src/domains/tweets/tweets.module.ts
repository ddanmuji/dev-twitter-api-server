import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from '../auth/auth.module';
import { TweetsController } from './tweets.controller';
import { TweetsRepository } from './tweets.repository';
import { Tweet, TweetSchema } from './tweets.schema';
import { TweetsService } from './tweets.service';

@Module({
	imports: [AuthModule, MongooseModule.forFeature([{ name: Tweet.name, schema: TweetSchema }])],
	providers: [TweetsService, TweetsRepository],
	controllers: [TweetsController]
})
export class TweetsModule {}
