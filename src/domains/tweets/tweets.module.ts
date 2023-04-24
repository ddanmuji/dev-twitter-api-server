import { Module } from '@nestjs/common';

import { TweetsController } from './tweets.controller';
import { TweetsService } from './tweets.service';

@Module({
	providers: [TweetsService],
	controllers: [TweetsController]
})
export class TweetsModule {}
