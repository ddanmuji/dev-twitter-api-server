import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { CurrentUser } from '../../shared/decorators/user.decorators';
import { Domain } from '../../shared/enums/domain.enums';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { UserReadOnlyData } from '../users/users.schema';
import { TweetCreateDto } from './dto/tweets.create.dto';
import { TweetQueryDto } from './dto/tweets.query.dto';
import { TweetsService } from './tweets.service';

@Controller(Domain.TWEETS)
export class TweetsController {
	constructor(private readonly tweetsService: TweetsService) {}

	@ApiOperation({ summary: '모든 트윗을 조회합니다.', tags: [Domain.TWEETS] })
	@Get('all')
	async getAllTweets(@Query() query: TweetQueryDto) {
		return this.tweetsService.getReadOnlyTweets(query);
	}

	@ApiOperation({ summary: '새로운 트윗을 작성합니다.', tags: [Domain.TWEETS] })
	@UseGuards(JwtAuthGuard)
	@Post('create')
	async createTweet(@CurrentUser() user: UserReadOnlyData, @Body() tweetCreateDto: TweetCreateDto) {
		return this.tweetsService.createTweet(user, tweetCreateDto);
	}
}
