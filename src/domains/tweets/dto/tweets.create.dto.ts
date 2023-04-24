import { PickType } from '@nestjs/swagger';

import { Tweet } from '../tweets.schema';

export class TweetCreateDto extends PickType(Tweet, ['tweet_text'] as const) {}
