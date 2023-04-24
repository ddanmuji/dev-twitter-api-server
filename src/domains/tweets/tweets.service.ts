import { Injectable } from '@nestjs/common';

import { UserReadOnlyData } from '../users/users.schema';
import { TweetCreateDto } from './dto/tweets.create.dto';
import { TweetQueryDto } from './dto/tweets.query.dto';
import { TweetsRepository } from './tweets.repository';

@Injectable()
export class TweetsService {
	constructor(private readonly tweetsRepository: TweetsRepository) {}

	async getReadOnlyTweets(query: TweetQueryDto) {
		const tweets = await this.tweetsRepository.findTweets(query);
		const readOnlyTweets = tweets.map(tweet => tweet.readOnlyData);

		return readOnlyTweets;
	}

	async createTweet(user: UserReadOnlyData, tweetCreateDto: TweetCreateDto) {
		const newTweet = await this.tweetsRepository.createTweet(user, tweetCreateDto);
		const readOnlyTweet = newTweet.readOnlyData;

		return readOnlyTweet;
	}
}
