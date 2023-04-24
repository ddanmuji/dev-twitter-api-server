import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserReadOnlyData } from '../users/users.schema';
import { TweetCreateDto } from './dto/tweets.create.dto';
import { TweetQueryDto } from './dto/tweets.query.dto';
import { Tweet } from './tweets.schema';

@Injectable()
export class TweetsRepository {
	constructor(@InjectModel(Tweet.name) private readonly tweetModel: Model<Tweet>) {}

	async findTweets(query: TweetQueryDto) {
		const limit = parseInt(query.limit, 10) || 10;
		const skip = parseInt(query.skip, 10) || 0;
		const tweets = await this.tweetModel
			.find()
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit)
			.exec();

		return tweets;
	}

	async createTweet(user: UserReadOnlyData, tweetCreateDto: TweetCreateDto) {
		const newTweet = await this.tweetModel.create({
			author: user.id,
			...tweetCreateDto
		});

		return newTweet;
	}
}
